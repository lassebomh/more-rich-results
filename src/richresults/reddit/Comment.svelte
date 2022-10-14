<script lang="ts">
    import { fetch, prettifyNumber, htmlDecode } from '../../lib/contentutils'
    import moment from 'moment'
    
    import CodeHighlight from "../../components/CodeHighlight.svelte";
    import Comments from './Comments.svelte';
    
    export let comment: any;
    export let post: any;

    export let shown: boolean | undefined = undefined

    if (shown === undefined) {
        shown = comment.data.score/(1 + post.ups + post.downs) > 0.4;
    }
</script>

<div style="border-color: rgba(var(--mrr-color), 0.25)" class="w-full border-solid border-0 border-l-2 pl-2 ml-2 relative">
    <button on:click={_ => shown = !shown} class="absolute -left-2 top-0 -translate-x-1/2 h-full bg-transparent border-none cursor-pointer"></button>
    <div class="opacity-50 py-1">
        <a class="text-[inherit]" href={"https://www.reddit.com/user/"+comment.data.author}>u/{comment.data.author}</a> • {comment.data.score} points • {moment(comment.data.created*1000).fromNow()}
    </div>
    {#if shown}
        <CodeHighlight class="mb-2 trimMargin">
            {@html htmlDecode(comment.data.body_html)}
        </CodeHighlight>
        {#if comment.data.replies}
            <Comments comments={comment.data.replies.data.children} {post} />
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