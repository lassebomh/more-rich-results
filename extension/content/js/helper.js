
Array.prototype.findAsync = async function (asyncCallback) {
    const promises = this.map(asyncCallback);
    const results = await Promise.all(promises);
    const index = results.findIndex(result => result);
    return this[index];
}

Array.prototype.mapAsync = async function (asyncCallback) {
    const promises = this.map(asyncCallback);
    const results = await Promise.all(promises);
    return results;
}

var ranges = [
    { divider: 1e18, suffix: 'E' },
    { divider: 1e15, suffix: 'P' },
    { divider: 1e12, suffix: 'T' },
    { divider: 1e9, suffix: 'G' },
    { divider: 1e6, suffix: 'M' },
    { divider: 1e3, suffix: 'k' }
];

function formatNumber(n) {
    for (var i = 0; i < ranges.length; i++) {
        if (n >= ranges[i].divider) {
            return Math.round(n / ranges[i].divider).toString() + ranges[i].suffix;
        }
    }
    return n.toString();
}

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

function makeid() {
    if (this.mxid === undefined) this.mxid = 0;
    this.mxid += 1;
    return this.mxid;
}

function delWWW(hostname) {
    return hostname.startsWith("www.") ? hostname.substring(4) : hostname
}

function getSetting(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([key], function(result) {
            resolve(result[key])
        });
    })
}

function setSetting(key, value) {
    console.log(`set ${key} to ${value}`);
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set({[key]: value}, resolve);
    })
}