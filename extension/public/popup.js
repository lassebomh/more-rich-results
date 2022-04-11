
var inputSyncs = [...document.querySelectorAll('input.sync')];

inputSyncs.forEach(inputSync => {

    chrome.storage.sync.get([inputSync.id], function(result) {

        if (inputSync.type === "checkbox") {
            if (result[inputSync.id] === undefined || result[inputSync.id] === null) {
                inputSync.checked = true
            } else {
                inputSync.checked = result[inputSync.id]
            }
        } else {
            throw new Error("Unknown input type")
        }
    });

    inputSync.addEventListener('change', (event) => {

        let key = event.target.id
        let object = {}

        if (event.target.type === "checkbox") {
            object[key] = event.target.checked
        } else {
            throw new Error("Unknown input type")
        }

        chrome.storage.sync.set(object);
    });
});
