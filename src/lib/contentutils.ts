
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

export function htmlDecode(input: string): string | null {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}