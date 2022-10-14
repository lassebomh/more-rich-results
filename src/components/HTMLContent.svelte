<script lang="ts">
    import hljs from 'highlight.js'
    import { onMount } from 'svelte';

    export let origin: string;
    export let html: string;
    export let decode: boolean = undefined;

    let domParser = new DOMParser();
    
    function HTMLDecode(input: string): string | null {
        var doc = domParser.parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }

    let root: HTMLElement;

    onMount(() => {
        console.log('hello!');
        
        root.querySelectorAll('code').forEach(code => {
            hljs.highlightElement(code)
        })
        root.querySelectorAll('a').forEach(a => {
            let match = a.outerHTML.match(/href\s*=\s*['"](\/[^'"]+)['"]/)
            if (match) a.href = origin + match[1]
        })
    })
</script>

<div bind:this={root} {...$$restProps}>
    {@html decode ? HTMLDecode(html) : html}
</div>
