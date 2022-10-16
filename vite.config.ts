import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { crx } from '@crxjs/vite-plugin'
import manifest from './src/manifest'
import { windi } from 'svelte-windicss-preprocess';

import WindiCSS from 'vite-plugin-windicss'


export default defineConfig({
    build: {
        emptyOutDir: true
    },
    plugins: [
        WindiCSS(),
        crx({ manifest }),
        svelte()
    ],
})
