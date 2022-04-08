
// Make all links avoid bounce
document.querySelectorAll("a").forEach(e => {
    console.log(e.href);
    if (!!e.href) {
        href = new URL(e.href)
        if (href.pathname === "/l/") {
            e.href = href.searchParams.get('uddg')
        }
    }
})

let main = document.querySelector("#header + div")
main.style.display = "flex";

let sidebar = main.new(`div`)
sidebar.style.width = "100%"
sidebar.style.maxWidth = "672px"
sidebar.style.marginTop = "30px"
sidebar.style.marginLeft = "24px"

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
                ddgSheet.innerHTML = ``
                preview.shadowRoot.appendChild(ddgSheet)
                
                sidebar.appendChild(preview)
            })
            break;
        }
    }
}, 800)