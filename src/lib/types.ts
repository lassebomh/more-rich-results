import type { ComponentType } from "svelte";

export interface PlatformHandler {
    getResultUrls: () => Promise<URL[]>,
    setupContainer: () => HTMLElement | null,
    getTheme: () => {[key: string]: any},
}

export interface RichResult {
    match: (url: URL) => boolean,
    component: ComponentType,
}