
import type { RichResult } from "../../lib/types"
import Component from "./Component.svelte"

export default <RichResult>{
    match: (url: URL) => url.hostname === "www.reddit.com" && /^\/r\/[\w_-]+\/comments\/[\w_-]+\/[\w_-]+\//.test(url.pathname),
    triggers: {
        // "reddit.com": ['imdb.com']
    },
    component: Component,
}
