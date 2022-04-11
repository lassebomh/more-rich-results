
let JAVASCRIPT_ENABLED = window.location.toString().indexOf("gbv=1") === -1

function findGoogleResultUrls() {
    let urls = []
    
    let results = Array.from(document.querySelectorAll(".g")).filter(g => !g.querySelector(".g"))
    for (let i = 0; i < results.length; i++) {
        let link = results[i].querySelector("a");

        if (!link || !link.href) continue;

        urls.push(new URL(link.href))
    }

    return urls
}

async function googlePreviews() {
    let rhs = document.querySelector("#rhs")
    let rcnt = document.querySelector("#rcnt")
    
    if (rcnt == null) return

    if (rhs === null) {
        rhs = document.createElement("div")
        rhs.id = "rhs"
        rcnt.appendChild(rhs)
    }

    rhs.style.marginLeft = "2em"
    rhs.style.width = "652px"
    rcnt.style.flexWrap = "initial"
    rcnt.style.maxWidth = "initial"

    let urls = findGoogleResultUrls();
    let preview = await newValidPreview(urls, `
        .preview-container a {
            color: #1a0dab;
        }
    `)

    if (preview != null) rhs.appendChild(preview)
}

if (INSIDE_IFRAME) {
    window.top.postMessage({
        "urls": findGoogleResultUrls().map(u => u.href),
        "type": "resulturls"
    })
} else {
    googlePreviews()
}

