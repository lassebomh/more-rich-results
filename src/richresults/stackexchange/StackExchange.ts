import type { RichResult } from "../../lib/types";
import Component from "./Component.svelte"
import stackexchange_hostnames from './stackexchange_hostnames.json'

export default <RichResult>{
    match: (url: URL) => stackexchange_hostnames.indexOf(url.hostname) != -1,
    triggers: {
        'stackoverflow.com': ["w3schools.com", "geeksforgeeks.org", "programiz.com", "tutorialspoint.com", "javatpoint.com"]
    },
    component: Component,
}