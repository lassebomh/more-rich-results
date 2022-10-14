import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'Stack Overflow & Reddit in Google',
  description: "",
  version: '1.0.0',
  manifest_version: 3,
  background: {
    service_worker: 'src/background/main.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['*://www.google.com/search?q=*'],
      js: ['src/content/googlehandler.ts'],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        'src/assets/hljs/*',
      ],
      matches: [
        "http://*/*",
        "https://*/*"
      ],
    },
  ],
})
