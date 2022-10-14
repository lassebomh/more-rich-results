import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'Stack Overflow & Reddit in Google',
  description: "",
  version: '1.0.2',
  manifest_version: 3,
  icons: {
    "16": "src/assets/images/icon_16.png",
    "32": "src/assets/images/icon_32.png",
    "64": "src/assets/images/icon_64.png",
    "128": "src/assets/images/icon_128.png",
    "256": "src/assets/images/icon_256.png",
  },
  background: {
    service_worker: 'src/background/main.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['*://www.google.com/search?q=*'],
      js: ['src/content/googlehandler.ts'],
    },
    {
      matches: ['*://www.startpage.com/sp/search', '*://www.startpage.com/sp/search*', '*://www.startpage.com/do/search', '*://www.startpage.com/do/search*'],
      js: ['src/content/startpagehandler.ts'],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        'src/assets/hljs/*',
        'src/assets/images/*',
      ],
      matches: [
        "http://*/*",
        "https://*/*"
      ],
    },
  ],
})
