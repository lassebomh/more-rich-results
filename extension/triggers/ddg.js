console.log("DDG")

Array.from(document.querySelectorAll(".js-sidebar-modules")).forEach((e) => {
    e.parentNode.removeChild(e);
})

let resultsSidebar = document.querySelector(".results--sidebar")
resultsSidebar.style.maxWidth = "672px"

setTimeout(() => {
        
    let results = Array.from(document.querySelectorAll(".result")).filter(g => !g.querySelector(".result"))

    for (let i = 0; i < results.length; i++) {
        let link = results[i].querySelector("a");

        if (!link || !link.href) continue;

        let resultUrl = new URL(link.href)
        let generatePreview = getPreviewGenerator(resultUrl)

        if (generatePreview !== undefined) {
            generatePreview().then((preview) => {
                let ddgSheet = document.createElement('style')
                ddgSheet.innerHTML = `
                    a {
                        color: var(--mrr-color-0);
                        font-weight: 600;
                    }

                    .preview-container {
                        font-family: "DDG_ProximaNova","DDG_ProximaNova_UI_0","DDG_ProximaNova_UI_1","DDG_ProximaNova_UI_2","DDG_ProximaNova_UI_3","DDG_ProximaNova_UI_4","DDG_ProximaNova_UI_5","DDG_ProximaNova_UI_6","Proxima Nova","Helvetica Neue","Helvetica","Segoe UI","Nimbus Sans L","Liberation Sans","Open Sans",FreeSans,Arial,sans-serif;
                    }
                `
                preview.shadowRoot.appendChild(ddgSheet)
                
                resultsSidebar.appendChild(preview)
            })
            break;
        }
    }
}, 800)