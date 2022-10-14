import { registerHandler } from "../lib/registerhandler"

registerHandler({
    getResultUrls: (): URL[] => {
        const atags: Element[] = [...document.querySelectorAll(".result-link")]

        console.log(atags);
        

        return atags.map((a: HTMLLinkElement) => new URL(a.href))
    },

    setupContainer: (): HTMLElement => {
        const sidebar = document.querySelector(".layout-web__sidebar") as HTMLElement
        sidebar.style.maxWidth = "initial"

        let previewContainer = document.createElement("div") as HTMLElement
        previewContainer.classList.add("previewContainer")
        
        sidebar.prepend(previewContainer as Node)

        return previewContainer
    },

    getTheme: () => {
        // const isDark = document.querySelector(":root").classList.contains("startpage-html--dark")
        // const rgb = isDark ? [255, 255, 255] : [32, 41, 69]

        const searchInput = document.querySelector('input[type="text"][name="query"]')
        
        const searchInputColor = window.getComputedStyle(searchInput).getPropertyValue("color")
        const rgb = searchInputColor.match(/\d+/g)!
                                    .map((value) => parseInt(value))

        // ADD LINK COLORS TO THEME

        return {
            '--mrr-color': rgb.join(", "),
        }
    }
})