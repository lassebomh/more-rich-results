
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
        maximumFractionDigits: 1
    }).format(value)
}

export function numberToLocaleDateString(value: number): string {
    return new Date(value).toLocaleDateString("en-GB")
}

export function numberToLocaleTimeString(value: number): string {
    let string = new Date(value).toLocaleTimeString("en-GB")
    return string.substring(0, string.length-3)
}


export function htmlDecode(input: string): string | null {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}
