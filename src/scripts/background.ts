
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
    (async () => {
        switch (message.type) {
            case 'fetch':
                const req = await fetch(message.args.url, message.args.init)
                const json = await req.json()
                sendResponse(json)
                break;
            default:
                throw new Error(`Unknown message type "${message.type}"`)
                break;
        }
    })()
    
    return true;
})

export {}