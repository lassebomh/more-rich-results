
let IN_IFRAME = window.parent[0] !== undefined
let JAVASCRIPT_ENABLED = window.location.toString().indexOf("gbv=1") === -1

function findGoogleNoScriptResultUrls() {
    let urls = []

    let results = document.querySelectorAll(".xpd")
    for (let i = 0; i < results.length; i++) {
        let link = Array.from(results[i].querySelectorAll("a")).find(e => e.querySelector("img") == null);
        
        if (!link || !link.href) continue;

        urls.push(new URL(link.href))
    }

    return urls
}

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

function fetchGoogleResultUrls(query) {
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
        iframe.src = "https://google.com/search?q="+encodeURI(query) + !JAVASCRIPT_ENABLED ? "&gbv=1" : ""
        iframe.style.display = "none"
    })
}

async function googleNoScriptPreviews() {

    // Make all links avoid bounce
    document.querySelectorAll("a").forEach(e => {
        href = new URL(e.href)
        if (href.pathname === "/url") {
            e.href = href.searchParams.get('q')
        }
    })

    // Make questions foldable
    let questionBoxes = document.querySelectorAll(".xpd .xpd") 
    for (const qb of questionBoxes) {
        let qcontainer = qb.parentElement.parentElement.parentElement

        var qdetails = document.createElement('details');
        qdetails.innerHTML = qcontainer.innerHTML;
        qdetails.classList = qcontainer.firstChild.classList;
        qdetails.style.padding = "0";
        
        qcontainer.parentNode.replaceChild(qdetails, qcontainer);

        var qsummary = document.createElement('summary');
        qsummary.innerHTML = qdetails.firstChild.innerHTML;
        qsummary.classList = qdetails.firstChild.classList;
        qsummary.style.cursor = "pointer";
        qsummary.style.marginLeft = "3px";
        qsummary.firstChild.style.fontSize = "1.1em";

        qdetails.replaceChild(qsummary, qdetails.firstChild);
    }

    let topsep = document.querySelector("#hdr + div > div > div :first-child")
                         .new(`div#hdr-border`)
    
    // Generate preview
    if ( (new URL(window.location).searchParams.get("tbm")) !== null ) return 
    
    document.body.style.maxWidth = "100%"

    let mainWrapper = document.createElement("div")
    mainWrapper.id = "main-wrapper"

    let main = document.querySelector("#main")

    mainWrapper.append(main);
    main.insertBefore(document.querySelector("#hdr"), main.firstChild);

    document.body.insertBefore(mainWrapper, document.querySelector(".csi"))

    let richResults = mainWrapper.new(`div#rich-results`)
    let preview;
    let urls = findGoogleNoScriptResultUrls()

    let generatePreview = urls.map(url => getPreviewGenerator(url)).find(pg => pg != null);

    if (generatePreview == null) {
        // [type, generatePreview] = fetchGoogleResultUrls().map(url => getPreviewGenerator(url)).find(pg => pg[1] !== undefined);
    }

    if (generatePreview != null) {
        preview = await generatePreview()

        let sheet = document.createElement('style')
        sheet.innerHTML = `
            .preview-container a {
                color: #1a0dab;
            }
        `
        preview.shadowRoot.appendChild(sheet)
        
        richResults.appendChild(preview)
    }

    if (preview == null) {

        // iframe = document.createElement("iframe")
        // iframe.src = "https://google.com/search?gbv=1&q="+encodeURI("javascript parse html from string")

        // console.log(iframe);

        // document.body.appendChild(iframe)
        // let r = await sendBgMessage({type: "gsearch", query: "javascript parse html from string"})
        // console.log(r);
    }
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

if (IN_IFRAME){
    window.top.postMessage({
        "urls": JAVASCRIPT_ENABLED ? findGoogleResultUrls().map(u => u.href) : findGoogleNoScriptResultUrls().map(u => u.href),
        "type": "resulturls"
    })
} else {
    JAVASCRIPT_ENABLED ? googlePreviews() : googleNoScriptPreviews()    
}

