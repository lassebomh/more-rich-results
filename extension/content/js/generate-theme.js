
let htmlRoot = document.querySelector(":root")

function midVec(hsl1, hsl0, frac) {
    // hsl1 = hsl1.map(Number)
    // hsl0 = hsl0.map(Number)

    return [
        hsl1[0] + (hsl0[0] - hsl1[0]) * frac,
        hsl1[1] + (hsl0[1] - hsl1[1]) * frac,
        hsl1[2] + (hsl0[2] - hsl1[2]) * frac,
    ]
}

let bgColor = parseColor(getComputedStyle(htmlRoot)["background-color"]).splice(0, 3)

if (bgColor.every(item => item === 0)) {
    bgColor = parseColor(getComputedStyle(document.body)["background-color"]).splice(0, 3)

    if (bgColor.every(item => item === 0)) {
        bgColor = [255, 255, 255]
    }
}

let bg = rgbToHsl(...bgColor)
let fg = [bg[0], bg[1], bg[2] * -1 + 1, 1]

let sheet = document.createElement(`style`)
sheet.innerHTML = `
    :root {
        --mrr-color-0: ${rgbToHex(hslToRgb(...fg))};
        --mrr-color-5: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.05)))};
        --mrr-color-10: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.1)))};
        --mrr-color-15: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.15)))};
        --mrr-color-20: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.2)))};
        --mrr-color-25: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.25)))};
        --mrr-color-30: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.3)))};
        --mrr-color-35: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.35)))};
        --mrr-color-40: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.4)))};
        --mrr-color-45: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.45)))};
        --mrr-color-50: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.5)))};
        --mrr-color-55: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.55)))};
        --mrr-color-60: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.6)))};
        --mrr-color-65: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.65)))};
        --mrr-color-70: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.7)))};
        --mrr-color-75: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.75)))};
        --mrr-color-80: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.8)))};
        --mrr-color-85: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.85)))};
        --mrr-color-90: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.9)))};
        --mrr-color-95: ${rgbToHex(hslToRgb(...midVec(fg, bg, 0.95)))};
        --mrr-color-100: ${rgbToHex(hslToRgb(...bg))};
    }
`
document.head.appendChild(sheet)