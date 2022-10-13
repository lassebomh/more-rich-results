import stackexchange from './integrations/stackexchange'
import reddit from './integrations/reddit'

import hljs from 'highlight.js'
import './styles.css'


const integrations = [
    stackexchange,
    reddit
]

const bodyColor = window.getComputedStyle(document.body).getPropertyValue("color")
const rgb = bodyColor.match(/\d+/g)!
                     .map((value) => parseInt(value))

document.body.style.setProperty("--mrp-text-color", rgb.join(", "));

if (rgb[0]+rgb[1]+rgb[2] < 100*3) {
    import('highlight.js/styles/github.css');
} else {
    import('highlight.js/styles/github-dark.css');
}

function insertPreview(component: HTMLElement) {
    const rcnt = document.querySelector("#rcnt") as HTMLElement
    rcnt.style.maxWidth = 'initial';

    const rhs = document.querySelector("#rhs")

    let previewContainer: HTMLElement;
    
    if (rhs != null) {
        previewContainer = rhs as HTMLElement
    } else {
        previewContainer = <div></div> as HTMLElement
        rcnt.style.flexWrap = "initial";
    }
    
    previewContainer.classList.add("previewContainer")
    
    rcnt.appendChild(previewContainer as Node)
    component.classList.add("more-result-previews")
    previewContainer.prepend(component)
}

// insertPreview(<h1>Hello world</h1> as HTMLElement)

function getResultLinks(): URL[] {
    const resultsElement: Element | null = document.querySelector("#rso")
    
    const links: URL[] = []

    if (resultsElement != null) {
        [...resultsElement.children].forEach((e) => {
            const link = e.querySelector("a")
            if (link != null) links.push(new URL(link.href));
        })
    }

    return links
}

const resultLinks = getResultLinks();

(async() => {
    linkLoop:
    for (const link of resultLinks) {
        for (const integration of integrations) {
            if (integration.match(link)) {
                const component = await integration.getComponent(link)
                
                if (component) {
                    insertPreview(component as HTMLElement)
    
                    component.querySelectorAll("code").forEach((code) => {
                        hljs.highlightElement(code);
                    })

                    break linkLoop;
                } else {
                    continue linkLoop;
                }
            }
        }
    }
})()


export {};
