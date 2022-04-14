  
class GNSTrigger extends SETrigger {
    async setupContainer () {
        
        document.querySelectorAll("a").forEach(e => {
            let h = e.getAttribute('href')
            console.log(h, e);
            if (!!h) {
                let url = new URL(h, h.startsWith('/') ? window.location : undefined)
                if (url.pathname === "/url") {
                    e.setAttribute('href', url.searchParams.get('q'))
                }
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
        let main = document.querySelector("#main")
        let mainWrapper = document.createElement("div")
        mainWrapper.id = "main-wrapper"
        mainWrapper.append(main);
        main.insertBefore(document.querySelector("#hdr"), main.firstChild);

        document.body.insertBefore(mainWrapper, document.querySelector(".csi"))
        return mainWrapper.new(`div#rich-results`)
    }

    async getPreviewTheme () {
        return `
            .preview-container a {
                color: #1a0dab;
            }
        `
    }

    getResultUrls () {
        let urls = []
    
        let results = document.querySelectorAll(".xpd")
        for (let i = 0; i < results.length; i++) {
            let link = Array.from(results[i].querySelectorAll("a")).find(e => e.querySelector("img") == null);
            
            if (!link || !link.href) continue;
    
            urls.push(new URL(link.href))
        }
    
        return urls
    }
}

let gns = new GNSTrigger()
gns.run()