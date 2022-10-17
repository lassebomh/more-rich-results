import { registerHandler } from "../lib/registerhandler"
// import { waitForElement } from '../lib/contentutils'

registerHandler({
    getResultUrls: async (): Promise<URL[]> => {
        let atags = [...document.querySelectorAll("#urls .result > a")]

        return atags.map((a: HTMLLinkElement) => new URL(a.href))
    },

    setupContainer: (): HTMLElement => {
        if (window.innerWidth <= 1280) return
        
        const sidebar = document.getElementById("sidebar") as HTMLElement
        sidebar.parentElement.style.gridTemplateColumns = "45rem 35rem"
        
        if (window.innerWidth <= 1480) sidebar.parentElement.style.gap = "0 3rem"
        

        let mrrContainer = document.createElement("div") as HTMLElement
        mrrContainer.classList.add("mrrContainer")
        
        sidebar.prepend(mrrContainer as Node)

        return mrrContainer
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