
if (window.location.toString().indexOf("gbv=1") !== -1) {
    console.log("ON NOSCRIPT")

    // modify queestions
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

        qdetails.replaceChild(qsummary, qdetails.firstChild);
    }

    document.body.style.maxWidth = "100%"
    let mainWrapper = document.createElement("div")
    mainWrapper.id = "main-wrapper"

    let main = document.querySelector("#main")
    main.style.maxWidth = "652px"

    mainWrapper.append(main);
    main.insertBefore(document.querySelector("#hdr"), main.firstChild);

    document.body.insertBefore(mainWrapper, document.querySelector(".csi"))

    richResults = mainWrapper.new(`div#rich-results`)

    let results = Array.from(document.querySelectorAll(".xpd")).filter(g => !g.querySelector(".xpd"))
    
    for (let i = 0; i < results.length; i++) {
        let link = results[i].querySelector("a");

        if (!link || !link.href) continue;

        let resultUrl = new URL(link.href)
        console.log();
        let [type, generatePreview] = getPreviewGenerator(resultUrl)

        if (generatePreview !== undefined) {
            generatePreview().then((preview) => {
                richResults.appendChild(preview)
                // if (i != 0) {
                //     rhs.new(`hr[style="border: none; border-bottom: 1px solid #d9dde1; margin: 2em 0;"]`)
                // }
            })
            
            break;
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
                    // if (i != 0) {
                    //     rhs.new(`hr[style="border: none; border-bottom: 1px solid #d9dde1; margin: 2em 0;"]`)
                    // }
                })
                
                break;
            }
        }
    }
}
