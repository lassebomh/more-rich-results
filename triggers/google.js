
if (window.location.toString().indexOf("gbv=1") !== -1) {

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
    if ( (new URL(window.location).searchParams.get("tbm")) === null ) {
            
        document.body.style.maxWidth = "100%"

        let mainWrapper = document.createElement("div")
        mainWrapper.id = "main-wrapper"

        let main = document.querySelector("#main")

        mainWrapper.append(main);
        main.insertBefore(document.querySelector("#hdr"), main.firstChild);

        document.body.insertBefore(mainWrapper, document.querySelector(".csi"))

        let richResults = mainWrapper.new(`div#rich-results`)
        let results = document.querySelectorAll(".xpd")

        for (let i = 0; i < results.length; i++) {
            let link = Array.from(results[i].querySelectorAll("a")).find(e => e.querySelector("img") == null);
            
            if (!link || !link.href) continue;
            
            let resultUrl = new URL(link.href)

            let [type, generatePreview] = getPreviewGenerator(resultUrl)

            if (generatePreview !== undefined) {
                generatePreview().then((preview) => {
                    let ddgSheet = document.createElement('style')
                    ddgSheet.innerHTML = `
                        .reddit-title-link {
                            color: #1a0dab;
                        }
                    `
                    preview.shadowRoot.appendChild(ddgSheet)
                    
                    richResults.appendChild(preview)
                })
                
                break;
            }
        }
    }

} else {
    
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
    
        let results = Array.from(document.querySelectorAll(".g")).filter(g => !g.querySelector(".g"))
    
        for (let i = 0; i < results.length; i++) {
            let link = results[i].querySelector("a");
    
            if (!link || !link.href) continue;
    
            let resultUrl = new URL(link.href)
            let [type, generatePreview] = getPreviewGenerator(resultUrl)
    
            if (generatePreview !== undefined) {
                generatePreview().then((preview) => {
                    let ddgSheet = document.createElement('style')
                    ddgSheet.innerHTML = `
                        .reddit-title-link {
                            color: #1a0dab;
                        }
                    `
                    preview.shadowRoot.appendChild(ddgSheet)

                    rhs.appendChild(preview)
                })
                
                break;
            }
        }
    }
}
