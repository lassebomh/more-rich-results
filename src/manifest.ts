import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'More Rich Results',
  description: "",
  version: '1.1.1',
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
    {
      matches: ['*://duckduckgo.com/?q=*'],
      js: ['src/content/duckduckgohandler.ts'],
    },
    {
      matches: ['*://searx.tiekoetter.com/search?q=*'],
      js: ['src/content/searxhandler.ts'],
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
  key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt3iSzzqFhszYdFruNZmtUrPWLTXCrFExRMcaPu0uGnyDjtI2cICkGmMLZzZU0532fXgfWNXmHeSoA0aYjKccQxSBfsdZr7YybQflUKQYYriLQjzbu5bd4GCMhAewq+d6SPg6WPjJ7xsj6DLNjLxmk5uEy2wp8TMuEJMfXZLF1ZsckdmxDehbLnin6NmOcvOwokqp4pImGnLoPk0uQB4uePMgmNLwf4PGAg5+DmfffoiqQ4LHXpjLAKKc7skUu3AQuzibFqkkim3NrnsXH4aV1kW4+1074q8KdY/gQHsWIDgxBf9vSvCLk8yI3KU29W5JyW1XmqpxDb/hjEeI/YkVtwIDAQAB",
})
