<script lang="ts">
import { subscribe } from "svelte/internal";

    import Comment from "./Comment.svelte";

    export let comments: any[];
    export let post: any;
    export let limit: number | undefined = undefined;
    export let depth: number;

    
    comments.sort((a, b) => a.data.score - b.data.score).reverse()    
    
    if (limit == undefined) limit = 3

    if (comments.length == limit + 1) limit = comments.length;

    let shownComments = []

    $: {
        shownComments = comments.slice(0, Math.min(limit, comments.length))
                                .filter(comment => comment.data.author != null)
    }
</script>

<div class="flex justify-start items-start flex-col gap-2">
    {#each shownComments as comment, i}
        <Comment {comment} {post} depth={depth} index={i}/>
    {/each}
    {#if limit < comments.length}
        <div class="flex justify-center items-center gap-1 opacity-80 text-center w-full">
            <a class="cursor-pointer" on:click={_ => limit += Math.min(6, comments.length-limit)}>
                Show {Math.min(6, comments.length-limit)} more 
            </a>
            <!-- <a class="cursor-pointer" on:click={_ => limit = comments.length}>
                (all {comments.length})
            </a> -->
        </div>
    {/if}
</div>

