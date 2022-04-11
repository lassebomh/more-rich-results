try {
    importScripts('./content/js/helper.js');
} catch (e) {
    console.error(e);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case 'fetch':
            fetch(request.url).then((response) => {
                response.json().then((json) => {
                    console.log(json);
                    sendResponse(json)
                })
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
