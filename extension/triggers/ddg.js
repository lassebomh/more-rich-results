
class SETrigger {
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
    }

    async run() {
        let urls = await this.getResultUrls()

        if (urls.length == 0) return

        if (INSIDE_IFRAME) {
            window.top.postMessage({
                "urls": urls.map(u => u.href),
                "type": "resulturls"
            })

        } else {
            let container = await this.setupContainer()
            let previewTheme = await this.getPreviewTheme()

            let preview = await newValidPreview(urls, previewTheme)

            if (preview == null) {
                urls = await this.getTriggeredResultUrls(urls)
                preview = await newValidPreview(urls, previewTheme)
            }
            
            if (preview != null) {
                container.appendChild(preview)
            }
        }
    }
}
  
class DDGTrigger extends SETrigger {
    async setupContainer () {
        let sidebar = document.querySelector(".results--sidebar")
        sidebar.style.maxWidth = "560px";
        sidebar.style.marginLeft = "calc(var(--max-content-width) + 12px)";
        
        // Remove builtin previews
        if (await getSetting("ddg_remove_builtin_previews")) {
            Array.from(document.querySelectorAll(".module")).forEach((e) => {
                e.parentNode.removeChild(e);
            })
        }

        return sidebar
    }

    async getPreviewTheme () {
        return `
            a {
                color: var(--mrr-color-0);
                font-weight: 600;
            }

            .preview-container {
                font-family: "DDG_ProximaNova", "DDG_ProximaNova_UI_0", "DDG_ProximaNova_UI_1", "DDG_ProximaNova_UI_2", "DDG_ProximaNova_UI_3", "DDG_ProximaNova_UI_4", "DDG_ProximaNova_UI_5", "DDG_ProximaNova_UI_6", "Proxima Nova", "Helvetica Neue", "Helvetica", "Segoe UI", "Nimbus Sans L", "Liberation Sans", "Open Sans",FreeSans,Arial,sans-serif;
            }
        `
    }

    getResultUrls () {
        let resultsContainer = document.getElementById('links')
        
        return new Promise((resolve, reject) => {
            
            let getURLs = () => {
                let urls = []
                let results = Array.from(document.querySelectorAll(".result")).filter(g => !g.querySelector(".result"))
            
                for (let i = 0; i < results.length; i++) {
                    let link = results[i].querySelector("a");
                    
                    if (!link || !link.href) continue;
            
                    urls.push(new URL(link.href))
                }
                return urls;
            }
        
            let observer = new MutationObserver((mutationsList, observer) => {
                resolve(getURLs())
                clearTimeout(timer);
                observer.disconnect();
            });
    
            let timer = setTimeout(() => {
                resolve(getURLs())
                observer.disconnect();
            }, 3000)
    
            observer.observe(resultsContainer, { childList: true });
        })
    }

    addDomainFilter (domain) {
        let location = new URL(window.location)
        location.searchParams.set("q", location.searchParams.get("q") + " site:" + domain)
        return location.href
    }
}

let ddg = new DDGTrigger()

ddg.run()