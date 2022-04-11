
function findDDGNSResultUrls() {
    let urls = []
    let results = Array.from(document.querySelectorAll(".result")).filter(g => !g.querySelector(".result"))

    for (let i = 0; i < results.length; i++) {
        let link = results[i].querySelector("a");
        if (!link || !link.href) continue;
        urls.push(new URL(link.href))
    }
    return urls;
}

// Make all links avoid bounce
document.querySelectorAll("a").forEach(e => {
    if (!!e.href) {
        href = new URL(e.href)
        if (href.pathname === "/l/") {
            e.href = href.searchParams.get('uddg')
        }
    }
})

let main = document.querySelector("#header + div")
main.style.display = "flex";

let sidebar = main.new(`div`);
sidebar.style.width = "100%";
sidebar.style.maxWidth = "672px";
sidebar.style.marginTop = "30px";
sidebar.style.marginLeft = "24px";

let urls = findDDGNSResultUrls()

newValidPreview(urls, ``).then((preview) => {
    sidebar.appendChild(preview)
})

