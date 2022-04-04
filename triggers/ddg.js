
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
        let [type, generatePreview] = getPreviewGenerator(resultUrl)

        if (generatePreview !== undefined) {
            generatePreview().then((preview) => {
                resultsSidebar.appendChild(preview)
            })
            break;
        }
    }
}, 800)