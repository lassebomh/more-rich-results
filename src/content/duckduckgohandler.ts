import { registerHandler } from "../lib/registerhandler"
import { waitForElement } from '../lib/contentutils'

registerHandler({
    getResultUrls: async (): Promise<URL[]> => {
        
        let atags: Element[]
        
        try {
            await waitForElement("#links h2 a", 1000);
            atags = [...document.querySelectorAll("#links h2 a")]
        } catch (error) {
            return []
        }

        return atags.map((a: HTMLLinkElement) => new URL(a.href))
    },

    setupContainer: (): HTMLElement => {
        const sidebar = document.querySelector(".results--sidebar") as HTMLElement
        sidebar.style.maxWidth = "min-content"
        
        if (window.innerWidth <= 1480) sidebar.style.marginLeft = "calc(var(--max-content-width) + 20px)"

        // remove builtin stackoverflow previews

        let mrrContainer = document.createElement("div") as HTMLElement
        mrrContainer.classList.add("mrrContainer")
        
        sidebar.prepend(mrrContainer as Node)

        return mrrContainer
    },

    getTheme: () => {
        const searchInput = document.querySelector('#search_form_input')
        
        const searchInputColor = window.getComputedStyle(searchInput).getPropertyValue("color")
        const rgb = searchInputColor.match(/\d+/g)!
                                    .map((value) => parseInt(value))

        const link = document.querySelector('#links h2 a')
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