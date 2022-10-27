<script lang="ts">
    import moment from 'moment'
    
    import HTMLContent from "../../components/HTMLContent.svelte";
    import Comments from './Comments.svelte';
    
    export let comment: any;
    export let post: any;
    export let index: number;
    export let depth: number;

    const isFirst = depth == 0 && index == 0
    const scoreRatio = comment.data.score/Math.max(post.score, 8)
    
    let highlight = isFirst && scoreRatio > 0.2;
    let shown = isFirst || scoreRatio > 0.12;

    </script>

<div style="border-color: rgba(var(--mrr-color), 0.25)" class="border-solid border-0 border-l-2 pl-2 ml-2 relative">
    <button on:click={_ => shown = !shown} class="absolute -left-2 top-0 -translate-x-1/2 h-full bg-transparent border-none cursor-pointer"></button>
    <div class="opacity-60 py-1">
        <a class="text-[inherit]" href={"https://www.reddit.com/user/"+comment.data.author}>u/{comment.data.author}</a> • {comment.data.score} points • {moment(comment.data.created*1000).fromNow()}
    </div>
    {#if shown}
        <HTMLContent
            class="trimMargin mb-2 {highlight ? "p-2 text-[1.1em]" : ""}"
            style={highlight ? "background-color: rgba(var(--mrr-color), 0.08);" : ""}
            html={comment.data.body_html}
            decode={true}
            origin="https://www.reddit.com" />
        {#if comment.data.replies}
            <Comments comments={comment.data.replies.data.children} {post} depth={depth+1} />
        {/if}
    {/if}
</div>
<!-- 
<div class={style.comment}>
    <div onClick={_ => changeVisibility(!hidden)} class={style.commentSpan}>
        <div class={style.commentSpanBorder}></div>
    </div>
    <div class={style.commentMain}>
        <div class={style.commentMeta}>
            <a href={"https://www.reddit.com/user/"+comment.data.author}>
                u/{comment.data.author} 
            </a>
            <span> • {comment.data.score} score</span>
            <span> • {numberToLocaleDateString(comment.data.created*1000)} {numberToLocaleTimeString(comment.data.created*1000)}</span>
        </div>
        {contentElement}
        {childrenElement != null && childrenElement}
    </div>
</div> -->