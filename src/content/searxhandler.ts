import { registerHandler } from "../lib/registerhandler"
// import { waitForElement } from '../lib/contentutils'

registerHandler({
    getResultUrls: async (): Promise<URL[]> => {
        let atags = [...document.querySelectorAll("#urls .result > a")]

        return atags.map((a: HTMLLinkElement) => new URL(a.href))
    },

    setupContainer: (): HTMLElement => {
        const sidebar = document.getElementById("sidebar") as HTMLElement
        sidebar.parentElement.style.gridTemplateColumns = "45rem 35rem"

        let previewContainer = document.createElement("div") as HTMLElement
        previewContainer.classList.add("previewContainer")
        
        sidebar.prepend(previewContainer as Node)

        return previewContainer
    },

    getTheme: () => {
        const searchInput = document.getElementById('q')
        
        const searchInputColor = window.getComputedStyle(searchInput).getPropertyValue("color")
        const rgb = searchInputColor.match(/\d+/g)!
                                    .map((value) => parseInt(value))

        return {
            '--mrr-color': rgb.join(", "),
        }
    }
})