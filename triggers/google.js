
var sheet = document.head.innerHTML += `
<style>
    #rhs {
        margin-left: 1vw;
        width: 32vw;
    }
    
    #rhs > div {
        max-width: 100% !important;
    }
    
    #rcnt {
        max-width: initial;
    }
</style>
`

let rhs = document.querySelector("#rhs")
let rcnt = document.querySelector("#rcnt")

if (rcnt != null) {

    if (rhs === null) {
        rhs = document.createElement("div")
        rhs.id = "rhs"
        rcnt.appendChild(rhs)
    }

    let results = Array.from(document.querySelectorAll(".g")).filter(g => !g.querySelector(".g"))

    for (let i = 0; i < results.length; i++) {
        let link = results[i].querySelector("a");

        if (!link || !link.href) continue;

        let resultUrl = new URL(link.href)
        let generatePreview = getPreviewGenerator(resultUrl)

        if (generatePreview !== undefined) {
            generatePreview().then((preview) => {
                rhs.appendChild(preview)
                // if (i != 0) {
                //     rhs.new(`hr[style="border: none; border-bottom: 1px solid #d9dde1; margin: 2em 0;"]`)
                // }
            })
            
            break;
        }

    }

}