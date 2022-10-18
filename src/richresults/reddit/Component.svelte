<script lang="ts">
    import { fetch, prettifyNumber } from '../../lib/contentutils'
    import moment from 'moment'

    import HTMLContent from "../../components/HTMLContent.svelte";
    import Spinner from "../../components/Spinner.svelte";

    import Comments from './Comments.svelte';

    export let url;
    
    let post: any;
    let comments: any[];

    let promise = new Promise(async resolve => {
        let reqUrl = url.href

        const qi = reqUrl.indexOf("?")
        if (qi !== -1) reqUrl = reqUrl.substring(0, qi)

        reqUrl += ".json"

        const json = await fetch(reqUrl, { cache: 'force-cache' })

        post = json[0].data.children[0].data
        post = post.crosspost_parent_list !== undefined ? post.crosspost_parent_list[0] : post
        if (json[1].data) comments = json[1].data.children
        
        resolve(null)
    })
</script>

{#await promise}
    <div></div>
{:then _} 
    <div>
        <div class="ml-2">
            <div class="flex justify-start items-center text-[0.85em] gap-4 pt-1 opacity-75">
                <div>
                    Posted by
                    <a href={"https://www.reddit.com/user/"+post.author} class="text-[inherit]">u/{post.author}</a>
                    on
                    <a href={"https://www.reddit.com/r/"+post.subreddit} class="text-[inherit]">r/{post.subreddit}</a>
                    {moment(post.created*1000).fromNow()} • {post.score} points
                    
                </div>
            </div>
            <a href={post.url}><h2 class="font-normal py-[0.25em] m-0">{@html post.title}</h2></a>
            {#if post.selftext_html}
                <HTMLContent class="trimMargin pb-3" html={post.selftext_html} decode={true} origin="https://www.reddit.com" />
            {/if}
        </div>
        {#if comments}
            <Comments comments={comments} limit={8} {post} depth={0} />
        {/if}
        {#if comments.length > 8}
            <div class="pt-2">
                <a class="ml-2" href={post.url}>
                    More comments
                </a>
            </div>
        {/if}
        <!-- {commentComponent(comments, 0).slice(0, 7)} -->
    </div>
{/await}