
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
