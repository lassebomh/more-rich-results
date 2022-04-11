
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

    let preview;
    let richResults = mainWrapper.new(`div#rich-results`)
    let urls = findGoogleNoScriptResultUrls()

    let generatePreview = await urls.mapAsync(async url => await getPreviewGenerator(url)).find(pg => pg != null);

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

if (INSIDE_IFRAME) {
    window.top.postMessage({
        "urls": findGoogleNoScriptResultUrls().map(u => u.href),
        "type": "resulturls"
    })
} else {
    googleNoScriptPreviews()    
}

