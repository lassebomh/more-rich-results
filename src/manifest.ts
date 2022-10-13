import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
    manifest_version: 3,
    version: "1.0.0",
    name: "Reddit & Stack Overflow in Google",
    // action: {
    //     default_popup: "src/pages/popup/index.html"
    // },
    background: {
        service_worker: "src/scripts/background.ts",
        type: "module"
    },
    content_scripts: [
        {
            js: ["src/scripts/content/index.tsx"],
            matches: ["*://www.google.com/search?q=*"]
        }
    ]
})
