  
class GTrigger extends SETrigger {
    async setupContainer () {
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
        rcnt.style.maxWidth = "initial"

        return rhs
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
        
        let results = Array.from(document.querySelectorAll(".g")).filter(g => !g.querySelector(".g"))
        for (let i = 0; i < results.length; i++) {
            let link = results[i].querySelector("a");
    
            if (!link || !link.href) continue;
    
            urls.push(new URL(link.href))
        }
    
        return urls
    }
}


let g = new GTrigger()
g.run()