  
class DDGTrigger extends SETrigger {
    async setupContainer () {
        let sidebar = document.querySelector(".results--sidebar")
        sidebar.style.maxWidth = "560px";
        sidebar.style.marginLeft = "calc(var(--max-content-width) + 12px)";

        // callbackChildChange(sidebar, (e) => {
        //     console.log(e);
        //     console.log(e.classList);
        // }, 1000)
        
        // // Remove builtin previews
        // if (await getSetting("ddg_remove_builtin_previews")) {
        //     console.log("Removing modules...");

        //     // document.querySelector(".js-module--stack_overflow").parentElement

        //     Array.from(document.querySelectorAll(".js-module--stack_overflow")).forEach((e) => {
        //         console.log(e);
        //         console.log(e.parentNode);
        //         let delModule = e.parentNode
        //         delModule.parentNode.removeChild(delModule);
        //     })
        // }
        
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
                console.log("results loaded");
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
}

let ddg = new DDGTrigger()

ddg.run()