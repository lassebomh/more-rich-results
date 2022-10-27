import type { ComponentType } from "svelte";

export interface PlatformHandler {
    getResultUrls: () => Promise<URL[]>,
    setupContainer: () => HTMLElement | null,
    getTheme: () => {[key: string]: any},
    filteredSearchUrl: (currentUrl: URL, triggerHost: string) => URL
}

export interface RichResult {
    match: (url: URL) => boolean,
    component: ComponentType,
    triggers: {[host: string]: Array<string>}
}