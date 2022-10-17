import { registerHandler } from "../lib/registerhandler"

registerHandler({
    getResultUrls: async (): Promise<URL[]> => {
        const resultsElement: Element | null = document.querySelector("#rso")
        
        const links: URL[] = []

        if (resultsElement != null) {
            [...resultsElement.children].forEach((e) => {
                const link = e.querySelector("a")
                if (link != null) links.push(new URL(link.href));
            })
        }

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
        
        mrrContainer.style.paddingLeft = "1.5rem"
        mrrContainer.classList.add("mrrContainer")

        rcnt.appendChild(mrrContainer as Node)

        return mrrContainer
    },

    getTheme: () => {
        
        const bodyColor = window.getComputedStyle(document.body).getPropertyValue("color")
        const rgb = bodyColor.match(/\d+/g)!
                             .map((value) => parseInt(value))

        return {
            '--mrr-color': rgb.join(", "),
        }
    }
})