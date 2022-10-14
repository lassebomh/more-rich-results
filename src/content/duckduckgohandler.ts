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

        // remove builtin stackoverflow previews

        let previewContainer = document.createElement("div") as HTMLElement
        previewContainer.classList.add("previewContainer")
        
        sidebar.prepend(previewContainer as Node)

        return previewContainer
    },

    getTheme: () => {
        // const isDark = document.querySelector(":root").classList.contains("startpage-html--dark")
        // const rgb = isDark ? [255, 255, 255] : [32, 41, 69]

        const searchInput = document.querySelector('#search_form_input')
        
        const searchInputColor = window.getComputedStyle(searchInput).getPropertyValue("color")
        const rgb = searchInputColor.match(/\d+/g)!
                                    .map((value) => parseInt(value))

        // ADD LINK COLORS TO THEME

        return {
            '--mrr-color': rgb.join(", "),
        }
    }
})