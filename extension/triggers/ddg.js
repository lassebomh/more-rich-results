
function findDuckDuckGoResultUrls() {
    let urls = []

    let results = Array.from(document.querySelectorAll(".result")).filter(g => !g.querySelector(".result"))

    console.log(results);

    for (let i = 0; i < results.length; i++) {
        let link = results[i].querySelector("a");
        
        if (!link || !link.href) continue;

        urls.push(new URL(link.href))
    }

    return urls
}

// Remove builtin Stackoverflow preview
Array.from(document.querySelectorAll(".js-sidebar-modules")).forEach((e) => {
    e.parentNode.removeChild(e);
})

let resultsSidebar = document.querySelector(".results--sidebar")
resultsSidebar.style.maxWidth = "560px";
resultsSidebar.style.marginLeft = "calc(var(--max-content-width) + 12px)";

setTimeout(async () => {
    console.log("hellooo");
    
    let urls = findDuckDuckGoResultUrls()
    console.log(urls);

    let generatePreview = urls.map(url => getPreviewGenerator(url)).find(pg => pg != null);
    console.log(generatePreview);

    if (generatePreview !== undefined) {
        // let preview = await generatePreview()
        generatePreview().then((preview) => {
            let sheet = document.createElement('style')
            sheet.innerHTML = `
                a {
                    color: var(--mrr-color-0);
                    font-weight: 600;
                }
    
                .preview-container {
                    font-family: "DDG_ProximaNova","DDG_ProximaNova_UI_0","DDG_ProximaNova_UI_1","DDG_ProximaNova_UI_2","DDG_ProximaNova_UI_3","DDG_ProximaNova_UI_4","DDG_ProximaNova_UI_5","DDG_ProximaNova_UI_6","Proxima Nova","Helvetica Neue","Helvetica","Segoe UI","Nimbus Sans L","Liberation Sans","Open Sans",FreeSans,Arial,sans-serif;
                }
            `
            preview.shadowRoot.appendChild(sheet)
            resultsSidebar.appendChild(preview)
        })
    }
}, 800)