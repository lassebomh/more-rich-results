
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
import '../assets/global.css';

import type { PlatformHandler, RichResult } from "./types";

import StackExchange from "../richresults/stackexchange/StackExchange";
import Reddit from "../richresults/reddit/Reddit";

const RICH_RESULTS = [StackExchange, Reddit]

async function mountResult(richResult: RichResult, url: URL, platform: PlatformHandler) {
    const theme = platform.getTheme()
    const mrrColor = theme['--mrr-color']
    const rgb = mrrColor.split(', ').map(s => parseInt(s))
    
    const isDark = rgb[0]+rgb[1]+rgb[2] > 130*3

    var hljsCss = document.createElement("link");
    hljsCss.rel = "stylesheet";
    hljsCss.href = chrome.runtime.getURL(isDark ? 'src/assets/hljs/github-dark.css' : 'src/assets/hljs/github.css');
  
    document.head.appendChild(hljsCss);

    for (const [key, value] of Object.entries(theme)) {
        document.body.style.setProperty(key, value);
    }
    
    const container = platform.setupContainer()
    if (container == null) throw new Error("Container couldn't be created")

    const innerContainer = document.createElement("div")
    container.prepend(innerContainer)
    
    container.style.color = `rgb(${mrrColor})`

    // mount
    new richResult.component({ target: innerContainer, props: { url } })
}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

async function checkResultsAndMount(results: URL[], platform: PlatformHandler): Promise<Boolean> {
    for (const url of results) {
        for (const richResult of RICH_RESULTS) {
            if (richResult.match(url)) {
                await mountResult(richResult, url, platform)
                return true;
            }
        }    
    }

    return false;
}

export async function registerHandler(platform: PlatformHandler) {
    const results = await platform.getResultUrls()
    
    if (inIframe()){
        window.top.postMessage({
            results: results.map(url => url.href)
        })
        return
    }

    let mounted = await checkResultsAndMount(results, platform);

    if (mounted) return

    

    let innerSearchFilterHost: string

    richResultLoop:
    for (const richResult of RICH_RESULTS) {
        for (const host in richResult.triggers) {
            const triggerHosts = richResult.triggers[host];
            for (const result of results) {
                const hostname = result.hostname.startsWith('www.') ? result.hostname.substring(4) : result.hostname
                
                if (triggerHosts.indexOf(hostname) != -1) {
                    innerSearchFilterHost = host
                    break richResultLoop;
                }
            }
        }
    }

    if (innerSearchFilterHost == null) return 

    // Inner search
    let innerSearch = document.createElement('iframe')

    const innerUrl = platform.filteredSearchUrl(new URL(window.location.href), innerSearchFilterHost);
    
    innerSearch.src = innerUrl.href

    innerSearch.style.display = 'none'
    document.body.appendChild(innerSearch)

    async function listener(msg) {
        if (mounted) return

        if (typeof msg.data != 'object' || !("results" in msg.data)) {
            return
        }
        
        const iframeResults = msg.data.results.map(href => new URL(href))
        mounted = await checkResultsAndMount(iframeResults, platform)
        
        innerSearch.remove()
        window.removeEventListener('message', listener)
    }

    window.addEventListener('message', listener)
}