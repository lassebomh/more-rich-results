
let INSIDE_IFRAME = window.parent[0] !== undefined

HTMLElement.prototype.new = function (selector, innerHTML) {
    
    let tag = selector.match(/[\w-]+/)[0]
    if (!tag) throw "Doesn't contain a tag"

    let element = document.createElement(tag);
    
    let properties = selector.match(/\[[^\]]+\]/g)
    if (!!properties) {
        for (const property of properties) {
            let kvpair = property.replace(/[\[\]]/g, "").split("=")
            element[kvpair[0]] = (kvpair[1] && kvpair[1].replace(/['"]/g, "")) || ""
        }
    }

    selector = selector.replace(/\[[^\]]+\]/g, "")

    let classes = selector.match(/\.([\w-]+)/g)
    if (!!classes) classes.forEach((_class) => element.classList.add(_class.slice(1)))

    let idMatch = selector.match(/#([\w-]+)/)
    if (!!idMatch) element.id = idMatch[0].slice(1);

    if (!!innerHTML) element.innerHTML = innerHTML

    this.appendChild(element)

    return element;
}
