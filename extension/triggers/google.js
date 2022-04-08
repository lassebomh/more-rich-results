
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

function fetchGoogleResultUrls(query, js_enabled) {
    if (js_enabled == null) js_enabled = true

    return new Promise((resolve, reject) => {
        let msgListener = (event) => {
            let msg = event.data
            if (msg.type === "resulturls") {
                window.removeEventListener("message", msgListener)
                resolve(msg.urls)
            };
        }

        window.addEventListener("message", msgListener, false);
        
        iframe = document.body.new("iframe")
        iframe.src = "https://google.com/search?q="+encodeURI(query) + !js_enabled ? "&gbv=1" : ""
        iframe.style.display = "none"
    })
}


async function googlePreviews() {
    let rhs = document.querySelector("#rhs")
    let rcnt = document.querySelector("#rcnt")
    
    if (rcnt != null) {
    
        if (rhs === null) {
            rhs = document.createElement("div")
            rhs.id = "rhs"
            rcnt.appendChild(rhs)
        }

        rhs.style.marginLeft = "2em"
        rhs.style.width = "652px"
        rcnt.style.flexWrap = "initial"
        rcnt.style.maxWidth = "initial"
    
        let urls = findGoogleResultUrls()

        let previewGenerators = urls.map(url => getPreviewGenerator(url))

        let generatePreview = previewGenerators.find(pg => pg != null);

        if (generatePreview == null) {
            
            // [type, generatePreview] = fetchGoogleResultUrls().map(url => getPreviewGenerator(url)).find(pg => pg[1] !== undefined);
        }

        if (generatePreview !== undefined) {
            let preview = await generatePreview()
            let sheet = document.createElement('style')
            sheet.innerHTML = `
                .preview-container a {
                    color: #1a0dab;
                }
            `
            preview.shadowRoot.appendChild(sheet)
            rhs.appendChild(preview)
        }
    }
}

if (INSIDE_IFRAME) {
    window.top.postMessage({
        "urls": findGoogleResultUrls().map(u => u.href),
        "type": "resulturls"
    })
} else {
    googlePreviews()
}

