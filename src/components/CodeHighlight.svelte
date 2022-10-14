<script lang="ts">
    import hljs from 'highlight.js'
    import { onMount } from 'svelte';

    let root: HTMLElement;

    onMount(() => {
        root.querySelectorAll('code').forEach(code => {
            hljs.highlightElement(code)
        })
    })
</script>

<div bind:this={root} {...$$restProps}>
    <slot />
</div>
