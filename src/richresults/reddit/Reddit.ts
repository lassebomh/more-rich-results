
import type { RichResult } from "../../lib/types"

export default <RichResult>{
    match: (url: URL) => url.hostname === "www.reddit.com" && /^\/r\/[\w_-]+\/comments\/[\w_-]+\/[\w_-]+\//.test(url.pathname),
    getComponent: async () => (await import("./Component.svelte")).default,
}
