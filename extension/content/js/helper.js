
Array.prototype.findAsync = async function (asyncCallback) {
    const promises = this.map(asyncCallback);
    const results = await Promise.all(promises);
    const index = results.findIndex(result => result);
    return this[index];
}

Array.prototype.mapAsync = async function (asyncCallback) {
    const promises = this.map(asyncCallback);
    const results = await Promise.all(promises);
    return results;
}

var ranges = [
    { divider: 1e18, suffix: 'E' },
    { divider: 1e15, suffix: 'P' },
    { divider: 1e12, suffix: 'T' },
    { divider: 1e9, suffix: 'G' },
    { divider: 1e6, suffix: 'M' },
    { divider: 1e3, suffix: 'k' }
];

function formatNumber(n) {
    for (var i = 0; i < ranges.length; i++) {
        if (n >= ranges[i].divider) {
            return Math.round(n / ranges[i].divider).toString() + ranges[i].suffix;
        }
    }
    return n.toString();
}

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

function makeid() {
    if (this.mxid === undefined) this.mxid = 0;
    this.mxid += 1;
    return this.mxid;
}

function delWWW(hostname) {
    return hostname.startsWith("www.") ? hostname.substring(4) : hostname
}

function getSetting(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([key], function(result) {
            resolve(result[key])
        });
    })
}

function setSetting(key, value) {
    console.log(`set ${key} to ${value}`);
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set({[key]: value}, resolve);
    })
}

async function fetchJson(href) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ type: "fetch-json", url: href }, (response) => {
            resolve(response);
        });
    });
}

async function fetchText(href) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ type: "fetch-text", url: href }, (response) => {
            resolve(response);
        });
    });
}

async function fetchWikidataEntities(property, claim) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ type: "wikidata-entities", property, claim }, (response) => {
            resolve(response);
        });
    });
}

function callbackChildChange(element, callback, timeout) {
    let observer = new MutationObserver((mutationsList, observer) => {
        console.log(mutationsList)
        // resolve(true)
        // observer.disconnect();
    });

    let timer = (typeof timeout === "number") && setTimeout(() => {
        console.log("stopped");
        observer.disconnect();
    }, timeout)

    observer.observe(element, { childList: true });
}

class SETrigger {
    async setupContainer () {}
    
    async getPreviewTheme () {}

    getResultUrls () {}

    addDomainFilter (domain) {
        let loc = new URL(window.location)
        let sq = loc.searchParams.get("q").split(" ").filter(s => !s.startsWith("site:")).join(" ")

        loc.searchParams.set("q", sq + " site:" + domain)

        return loc.href
    }

    async getDomainFilteredResultUrls(domain) {
        
        return new Promise((resolve, reject) => {
            let msgListener = (event) => {
                let msg = event.data
                if (msg.type === "resulturls") {
                    window.removeEventListener("message", msgListener)
                    resolve(msg.urls.map(u => new URL(u)))
                };
            }

            window.addEventListener("message", msgListener, false);
            
            let iframe = document.body.new("iframe")
            iframe.src = this.addDomainFilter(domain)
            iframe.style.display = "none"
        })
    }

    async getTriggeredResultUrls(urls) {
        let resultsDomainSet = new Set(urls.map(u => delWWW(u.hostname)))

        for (let i = 0; i < integrations.length; i++) {
            let integration = integrations[i];
            let triggers = integration.triggers;
            let triggerKeys = Object.keys(triggers)

            for (let x = 0; x < triggerKeys.length; x++) {
                const key = triggerKeys[x];
                if (triggers[key].some((e) => resultsDomainSet.has(delWWW(e)))) {
                    return await this.getDomainFilteredResultUrls(key)
                }
            }
        }

        return []
    }

    async run() {
        let container = await this.setupContainer()
        let urls = await this.getResultUrls()

        if (urls.length == 0) return

        if (INSIDE_IFRAME) {
            window.top.postMessage({
                "urls": urls.map(u => u.href),
                "type": "resulturls"
            })

        } else {
            let previewTheme = await this.getPreviewTheme()

            let preview = await newValidPreview(urls, previewTheme)
            console.log(preview);

            if (preview == null) {
                console.log("Looking for trigger urls");
                urls = await this.getTriggeredResultUrls(urls)
                preview = await newValidPreview(urls, previewTheme)
            }
            
            if (preview != null) {
                container.prepend(preview)
            }
        }
    }
}