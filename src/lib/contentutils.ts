
export function fetch(url: any, init?: any): any {
    return chrome.runtime.sendMessage({
        type: 'fetch',
        args: {
            url: url,
            init: init ?? {}
        },
    })
}

export function prettifyNumber(value: number): string {
    return Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 0
    }).format(value)
}


export function waitForElement(selector: string, timeout_ms?: number): Promise<Element> {
    return new Promise((resolve, reject) => {
        
        const match = document.querySelector(selector)
        if (match) return resolve(match);

        const timeout = timeout_ms != null && setTimeout(reject, timeout_ms)
        
        const observer = new MutationObserver(_ => {
            const match = document.querySelector(selector)
            if (match) {
                timeout && clearTimeout(timeout)
                resolve(match)
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
