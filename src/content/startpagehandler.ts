import { registerHandler } from "../lib/registerhandler"

registerHandler({
    getResultUrls: async (): Promise<URL[]> => {
        const atags: Element[] = [...document.querySelectorAll(".result-link")]

        return atags.map((a: HTMLLinkElement) => new URL(a.href))
    },

    setupContainer: (): HTMLElement | null => {
    
        const sidebar = document.querySelector(".layout-web__sidebar") as HTMLElement
        sidebar.style.maxWidth = "initial"

        const results = document.querySelector(".layout-web__mainline") as HTMLElement
        results.style.marginLeft = '30px'

        let mrrContainer = document.createElement("div") as HTMLElement
        mrrContainer.classList.add("mrrContainer")
        
        sidebar.prepend(mrrContainer as Node)

        return mrrContainer
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