
if (window.location.toString().indexOf("gbv=1") !== -1) {
    console.log("ON NOSCRIPT")

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

    // Add modern styling
    let a = document.querySelector("#hdr + div > div > div")
    a.style.boxShadow = "none"
    a.style.borderRadius = "initial"

    a.parentElement.style.marginTop = "10px"

    let b = a.firstElementChild
    b.style.backgroundColor = "transparent"
    b.style.borderTop = "none"
    console.log(b)

    let c = document.querySelector("#hdr > :last-child")
    c.style.borderRadius = "100px"
    c.style.marginTop = "32px"

    let f = c.firstElementChild
    c.style.height = "44px"

    let sbc = document.querySelector("#sf div.sbc.esbc")
    sbc.style.margin = "2.7px 3px"

    let sbcbutton = document.querySelector("#sf button[type=submit]")
    sbcbutton.style.height = "44px"
    sbcbutton.style.width = "48px"
    sbcbutton.style.borderTopRightRadius = "100px"
    sbcbutton.style.borderBottomRightRadius = "100px"
    sbcbutton.style.backgroundPosition = "3px center";

    
    
    Array.from(b.firstElementChild.firstElementChild.children).forEach((e, i, a) => {
        e.style.padding = "0 8px"
        e.style.lineHeight = "40px"

        if (i == a.length - 1) {
            e.style.borderLeft = "none"
            e.firstElementChild.style.padding = "0"
        }
    })
    
    
    // Generate preview
    if ( (new URL(window.location).searchParams.get("tbm")) === null ) {
            
        document.body.style.maxWidth = "100%"
        let mainWrapper = document.createElement("div")
        mainWrapper.id = "main-wrapper"
        mainWrapper.style.display = "flex"

        let main = document.querySelector("#main")
        main.style.maxWidth = "652px"

        mainWrapper.append(main);
        main.insertBefore(document.querySelector("#hdr"), main.firstChild);

        document.body.insertBefore(mainWrapper, document.querySelector(".csi"))

        let richResults = mainWrapper.new(`div#rich-results`)
        richResults.style.marginTop = "120px"
        richResults.style.marginLeft = "60px"
        richResults.style.maxWidth = "620px"

        let results = document.querySelectorAll(".xpd")

        
        for (let i = 0; i < results.length; i++) {
            let link = Array.from(results[i].querySelectorAll("a")).find(e => e.querySelector("img") == null);
            
            if (!link || !link.href) continue;
            
            let resultUrl = new URL(link.href)

            let [type, generatePreview] = getPreviewGenerator(resultUrl)

            if (generatePreview !== undefined) {
                generatePreview().then((preview) => {
                    richResults.appendChild(preview)
                })
                
                break;
            }
        }
    }

} else {

    document.head.innerHTML += `
    <style>
        #rhs {
            margin-left: 1vw;
            width: 32vw;
        }
        
        #rhs > div {
            max-width: 100% !important;
        }
        
        #rcnt {
            max-width: initial;
        }
    </style>
    `
    
    let rhs = document.querySelector("#rhs")
    let rcnt = document.querySelector("#rcnt")
    
    if (rcnt != null) {
    
        if (rhs === null) {
            rhs = document.createElement("div")
            rhs.id = "rhs"
            rcnt.appendChild(rhs)
        }
    
        let results = Array.from(document.querySelectorAll(".g")).filter(g => !g.querySelector(".g"))
    
        for (let i = 0; i < results.length; i++) {
            let link = results[i].querySelector("a");
    
            if (!link || !link.href) continue;
    
            let resultUrl = new URL(link.href)
            let [type, generatePreview] = getPreviewGenerator(resultUrl)
    
            if (generatePreview !== undefined) {
                generatePreview().then((preview) => {
                    rhs.appendChild(preview)
                })
                
                break;
            }
        }
    }
}
