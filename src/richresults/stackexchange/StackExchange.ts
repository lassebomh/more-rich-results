import type { RichResult } from "../../lib/types";

export default <RichResult>{
    match: (url: URL) => url.hostname === "stackoverflow.com",
    getComponent: async () => (await import("./Component.svelte")).default,
}