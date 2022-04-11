importScripts('../content/js/helper.js', "./wikibase-sdk.min.js");

const wbk = WBK({
    instance: "https://www.wikidata.org",
    sparqlEndpoint: 'https://query.wikidata.org/bigdata/namespace/wdq/sparql'
})

const simplificationOptions = {
    keepRichValues: true,
    keepQualifiers: true,
    keepReferences: true,
    keepIds: true,
    keepHashes: true,
    keepNonTruthy: true,
    keepNonDeprecated: true,
    addUrl: true
  }
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case 'fetch-json':
            fetch(request.url).then((response) => {
                response.json().then((json) => {
                    sendResponse(json)
                })
            })
            break;
        case 'fetch-text':
            fetch(request.url).then((response) => {
                response.text().then((json) => {
                    sendResponse(json)
                })
            })
            break;
        case 'wikidata-entities':
            WKEntities(request.property, request.claim).then((json) => {
                sendResponse(json)
            })
            break;
        default:
            throw "Unknown request type";
            break;
    }
    return true;
});

chrome.runtime.onInstalled.addListener(() => {
    let defaultSettings = {
        stackexchange: true,
        reddit: true,
        rottentomatoes: true,
        google: true,
        google_noscript: true,
        ddg: true,
        ddg_remove_builtin_previews: true,
        ddg_noscript: true,
    }

    Object.keys(defaultSettings).forEach(key => {
        setSetting(key, defaultSettings[key])
    });
});

async function WKEntities(property, claim) {
    let url = wbk.getReverseClaims(property, claim, { keepProperties: true, limit: 1 })
    let rcr = await fetch(url)
    let rcj = await rcr.json()

    let entitiesIds = wbk.simplify.sparqlResults(rcj, { minimize: true })
    let eir = await fetch(wbk.getEntities(entitiesIds))
    let entities = await eir.json()
    
    return wbk.simplify.entities(entities, simplificationOptions)
    
}

(async () => {
        
    // const authorQid = 'Q535'
    // const sparql = `
    // SELECT ?work ?date WHERE {
    //     ?work wdt:P50 wd:${authorQid} .
    //     OPTIONAL {
    //         ?work wdt:P577 ?date .
    //     }
    // }
    // `
    // const url = wbk.sparqlQuery(sparql)

    //
})()