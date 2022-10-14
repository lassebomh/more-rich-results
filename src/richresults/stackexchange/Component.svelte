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
        <div class="flex justify-start items-center text-[0.9em] gap-3 pt-1 pb-2 opacity-60">
            <div>
                Viewed {prettifyNumber(question.view_count)} times
            </div>
            <div>
                Asked {moment(question.creation_date*1000).fromNow()}
            </div>
            <div>
                Modified {moment(question.last_edit_date*1000).fromNow()}
            </div>
            <div class="flex-grow text-right">
                <button on:click={_ => questionIsVisible = !questionIsVisible}
                    class="bg-transparent border-none hover:underline text-[inherit] cursor-pointer p-0">
                    {#if questionIsVisible}
                        Hide question
                    {:else}
                        Show question
                    {/if}
                </button>
            </div>
        </div>
        {#if questionIsVisible}
            <CodeHighlight
                    class="trimMargin border-0 border-t border-solid pt-2.5"
                    style="border-color: rgba(var(--mrr-color), 0.2)">
                {@html question.body}
            </CodeHighlight>
        {/if}
        <div style="border-color: rgba(var(--mrr-color), 0.2)" class="border border-solid rounded px-3 pt-2 mb-4">
            <div class="flex justify-start items-center text-[0.9em] gap-3 mb-1">
                <div class="opacity-60">
                    Score {prettifyNumber(answer.score)}
                </div>
                <div class="opacity-60">
                    Posted {moment(answer.creation_date*1000).fromNow()}
                </div>
                <div class="opacity-60">
                    Modified {moment(answer.last_edit_date*1000).fromNow()}
                </div>
                <div class="flex-grow text-right text-lg text-lime-500" title="Accepted answer">🗹</div>
            </div>
            <CodeHighlight class="trimMargin">
                {@html answer.body}
            </CodeHighlight>
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