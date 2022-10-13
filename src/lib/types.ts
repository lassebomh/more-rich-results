import type { ComponentType } from "svelte";

export interface PlatformHandler {
    getResultUrls: () => URL[],
    setupContainer: () => HTMLElement,
    getTheme: () => {[key: string]: any},
}

export interface RichResult {
    match: (url: URL) => boolean,
    getComponent: () => Promise<ComponentType>,
}