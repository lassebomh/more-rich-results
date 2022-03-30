
let resultsSidebar = document.querySelector(".results--sidebar")

setTimeout(() => {
        
    let results = Array.from(document.querySelectorAll(".result")).filter(g => !g.querySelector(".result"))

    console.log(results);

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