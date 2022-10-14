<script lang="ts">
    import { fetch, prettifyNumber } from '../../lib/contentutils'
    import moment from 'moment'
    import HTMLContent from "../../components/HTMLContent.svelte";

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
        <a href={question.link}>
            <h1 class="text-2xl font-normal">{@html question.title}</h1>
        </a>
        <div class="flex justify-start items-center text-[0.9em] gap-3 pt-1 pb-2 opacity-60">
            <div class="w-max">
                Viewed {prettifyNumber(question.view_count)} times
            </div>
            <div class="w-max">
                Asked {moment(question.creation_date*1000).fromNow()}
            </div>
            <div class="w-max">
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
            <div class="border-0 border-t border-solid pt-2.5 pb-3"
                style="border-color: rgba(var(--mrr-color), 0.2); animation: fadein 0.5s;">

                <HTMLContent class="trimMargin" html={question.body} origin={url.origin} />
            </div>
        {/if}
        <div style="border-color: rgba(var(--mrr-color), 0.2);" class="border border-solid rounded px-3 py-2 mb-4">
            <div class="flex justify-start items-center text-[0.9em] gap-3 mb-1">
                <div class="opacity-60 w-max">
                    Score {prettifyNumber(answer.score)}
                </div>
                <div class="opacity-60 w-max">
                    Posted {moment(answer.creation_date*1000).fromNow()}
                </div>
                {#if answer.last_edit_date}
                    <div class="opacity-60 w-max">
                        Modified {moment(answer.last_edit_date*1000).fromNow()}
                    </div>
                {/if}
                <div class="flex-grow text-right text-lg text-lime-500 w-max" title="Accepted answer">🗹</div>
            </div>
            <HTMLContent class="trimMargin" html={answer.body} origin={url.origin} />
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