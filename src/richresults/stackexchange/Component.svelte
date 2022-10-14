<script lang="ts">
    import { fetch, prettifyNumber, htmlDecode } from '../../lib/contentutils'
    import moment from 'moment'
    import CodeHighlight from "../../components/CodeHighlight.svelte";

    export let url: URL;

    const fetchUrl = `https://api.stackexchange.com/2.2/questions/${url.pathname.split("/")[2]}?&site=${url.hostname}&filter=%21T%2ahPNRA69ofM1izkPP`

    let questionIsVisible = false
    let question: any
    let answer: any

    let data = new Promise(async resolve => {
        const json: any = await fetch(fetchUrl, { cache: 'force-cache' })

        question = json.items[0]
        question.answers = question.answers ?? []
        
        question.answers.sort((a: any, b: any) => {
            return b.score * (b.is_accepted ? 1.15 : 1) - a.score * (a.is_accepted ? 1.15 : 1)
        })

        answer = question.answers.length > 0 && question.answers[0]
        
        resolve(json)
    })
</script>

{#await data}
    Loading...
{:then _}
    <div>
        <a href={question.link}><h1 class="text-2xl">
            {@html question.title}
        </h1></a>
        <div class="flex justify-start items-center gap-3 py-1 opacity-75">
            <div>
                <span>Viewed</span> {prettifyNumber(question.view_count)} times
            </div>
            <div>
                <span>Asked</span> {moment(question.creation_date*1000).fromNow(true)} ago
            </div>
            <div>
                <span>Modified</span> {moment(question.last_edit_date*1000).fromNow(true)} ago
            </div>
        </div>
        {#if questionIsVisible}
            <div>
                <CodeHighlight>
                    {@html question.body}
                </CodeHighlight>
            </div>
        {:else}
            <button
                on:click={_ => questionIsVisible = true}
                style="background-color: rgba(var(--mrr-color), 0.1)"
                class="w-full py-3 border-none rounded my-4 cursor-pointer">
                
                Show question
            </button>
        {/if}
        <div style="border-color: rgba(var(--mrr-color), 0.1)" class="border border-solid rounded px-3 pt-2 mb-4">
            <div class="flex justify-start items-center gap-3">
                <div class="opacity-75">
                    Score {prettifyNumber(answer.score)}
                </div>
                <div class="opacity-75">
                    Posted {moment(answer.creation_date*1000).fromNow(true)} ago
                </div>
                <div class="opacity-75">
                    Modified {moment(answer.last_edit_date*1000).fromNow(true)} ago
                </div>
                <div class="flex-grow text-right text-lg" title="Accepted answer">🗹</div>
            </div>
            <div>
                <CodeHighlight>
                    {@html answer.body}
                </CodeHighlight>
            </div>
        </div>
        {#if question.answers.length > 1}
            <div class="text-center">
                <a href={question.link}>
                    More solutions ({question.answers.length - 1})
                </a>
            </div>
        {/if}
    </div>
{/await}