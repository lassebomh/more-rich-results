<script lang="ts">
    import Comment from "./Comment.svelte";

    export let comments: any[];
    export let post: any;
    export let limit: number | undefined = undefined;
    export let depth: number;

    comments.sort((a, b) => a.data.score - b.data.score).reverse()
    if (limit) comments = comments.slice(0, limit)

</script>

<div class="flex justify-start items-start flex-col gap-2">
    {#each comments as comment, i}
        {#if comment.data.author}
            <Comment {comment} {post} depth={depth} index={i}/>
        {/if}
    {/each}
</div>

