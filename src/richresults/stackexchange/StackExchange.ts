import type { RichResult } from "../../lib/types";
import Component from "./Component.svelte"

export default <RichResult>{
    match: (url: URL) => url.hostname === "stackoverflow.com",
    getComponent: async () => Component,
}