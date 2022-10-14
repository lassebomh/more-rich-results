import { registerHandler } from "../lib/registerhandler"

registerHandler({
    getResultUrls: (): URL[] => {
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
        rcnt.style.maxWidth = 'initial';
        const rhs = document.querySelector("#rhs")

        let previewContainer: HTMLElement;
        
        if (rhs != null) {
            previewContainer = rhs as HTMLElement
        } else {
            previewContainer = document.createElement("div") as HTMLElement
            rcnt.style.flexWrap = "initial";
        }
        
        previewContainer.classList.add("previewContainer")
        rcnt.appendChild(previewContainer as Node)

        return previewContainer
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