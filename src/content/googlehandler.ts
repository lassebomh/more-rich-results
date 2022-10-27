import { registerHandler } from "../lib/registerhandler"

registerHandler({
    getResultUrls: async (): Promise<URL[]> => {
        const resultsElement: Element | null = document.querySelector("#rso")
        
        const links: URL[] = []

        // if (resultsElement != null) {
        //     [...resultsElement.children].forEach((e) => {
        //         const link = e.querySelector("a")
        //         if (link != null) links.push(new URL(link.href));
        //     })
        // }
        // const links = []

        document.querySelectorAll("#rso div:has(cite) a:has(h3)").forEach((node: HTMLLinkElement) => {
            links.push(new URL(node.href))
        })

        return links
    },

    setupContainer: (): HTMLElement => {
        const rcnt = document.querySelector("#rcnt") as HTMLElement
        if (rcnt == null) return
        
        rcnt.style.maxWidth = 'initial';
        const rhs = document.querySelector("#rhs")

        let mrrContainer: HTMLElement;
        
        if (rhs != null) {
            mrrContainer = rhs as HTMLElement
        } else {
            mrrContainer = document.createElement("div") as HTMLElement
            rcnt.style.flexWrap = "initial";
        }
        
        mrrContainer.style.paddingLeft = "0"
        mrrContainer.style.marginLeft = "2rem"
        mrrContainer.classList.add("mrrContainer")

        rcnt.append(mrrContainer as Node)

        return mrrContainer
    },

    getTheme: () => {
        
        const bodyColor = window.getComputedStyle(document.body).getPropertyValue("color")
        const rgb = bodyColor.match(/\d+/g)!
                             .map((value) => parseInt(value))

        const link = document.querySelector('#rso .g a h3')
        const linkColor = window.getComputedStyle(link).getPropertyValue("color")

        const linkRgb = linkColor.match(/\d+/g)!
                                    .map((value) => parseInt(value))

        return {
            '--mrr-color': rgb.join(", "),
            '--mrr-link-color': linkRgb.join(", "),
        }
    },

    filteredSearchUrl: (currentUrl: URL, triggerHost: string): URL => {
        currentUrl.searchParams.set("q", currentUrl.searchParams.get("q") + ' site:' + triggerHost)
        
        return currentUrl
    }
})