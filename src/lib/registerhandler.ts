
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
import '../assets/global.css';

import type { PlatformHandler } from "./types";

import StackExchange from "../richresults/stackexchange/StackExchange";
import Reddit from "../richresults/reddit/Reddit";

const RICH_RESULTS = [StackExchange, Reddit]

export async function registerHandler(platform: PlatformHandler) {
    const results = await platform.getResultUrls()

    urlLoop:    
    for (const url of results) {
        
        resultLoop:
        for (const richResult of RICH_RESULTS) {

            if (richResult.match(url)) {
                // setup
                const theme = platform.getTheme()
                const mrrColor = theme['--mrr-color']
                const rgb = mrrColor.split(', ').map(s => parseInt(s))
                
                const isDark = rgb[0]+rgb[1]+rgb[2] > 130*3

                console.log(isDark);
                
                
                var hljsCss = document.createElement("link");
                hljsCss.rel = "stylesheet";
                hljsCss.href = chrome.runtime.getURL(isDark ? 'src/assets/hljs/github-dark.css' : 'src/assets/hljs/github.css');
              
                document.head.appendChild(hljsCss);

                for (const [key, value] of Object.entries(theme)) {
                    document.body.style.setProperty(key, value);
                }
                
                const container = platform.setupContainer()
                container.style.color = `rgb(${mrrColor})`

                // mount
                const Component = await richResult.getComponent()
                new Component({ target: container, props: { url } })
                
                break urlLoop;
            } else {
                continue resultLoop;
            }
        }    
    }
}