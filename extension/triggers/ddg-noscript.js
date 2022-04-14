class DDGNSTrigger extends SETrigger {
    async setupContainer () {
        // Make all links avoid bounce
        document.querySelectorAll("a").forEach(e => {
            let h = e.getAttribute('href')
            if (!!h) {
                let url = new URL(h, h.startsWith('/') ? window.location : null)
                if (url.pathname === "/l/") {
                    e.setAttribute('href', url.searchParams.get('uddg'))
                }
            }
        })

        let main = document.querySelector("#header + div")
        main.style.display = "flex";

        let sidebar = main.new(`div`);
        sidebar.style.width = "100%";
        sidebar.style.maxWidth = "672px";
        sidebar.style.marginTop = "30px";
        sidebar.style.marginLeft = "24px";

        return sidebar
    }

    async getPreviewTheme () {
        return ``
    }

    getResultUrls () {
        let urls = []
        let results = Array.from(document.querySelectorAll(".result")).filter(g => !g.querySelector(".result"))
    
        for (let i = 0; i < results.length; i++) {
            let link = results[i].querySelector("a");
            if (!link || !link.href) continue;
            urls.push(new URL(link.href))
        }
        return urls;
    }
}

let ddgns = new DDGNSTrigger()

ddgns.run()