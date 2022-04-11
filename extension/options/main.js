
var inputSyncs = [...document.querySelectorAll('input.sync')];

inputSyncs.forEach(async inputSync => {
    let settingValue = await getSetting(inputSync.id)

    if (inputSync.type === "checkbox") {
        inputSync.checked = settingValue
    }

    inputSync.addEventListener('change', (event) => {
        if (event.target.type === "checkbox") {
            setSetting(event.target.id, event.target.checked)
        }
    });
});
