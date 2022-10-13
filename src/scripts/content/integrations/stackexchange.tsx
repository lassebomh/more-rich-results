import stackexchange_hostnames from './stackexchange_hostnames.json'
import style from './integrations.module.css'
import { fetch, prettifyNumber, numberToLocaleDateString } from '../utils'

export default {
    match: (url: URL) => {
        return stackexchange_hostnames.includes(url.hostname) && url.pathname.startsWith("/questions")
    },
    getComponent: async (url: URL): Promise<HTMLElement | undefined> => {
        
        const questionId = url.pathname.split("/")[2]
        const site = url.hostname

        const json = await fetch(`https://api.stackexchange.com/2.2/questions/${questionId}?&site=${site}&filter=%21T%2ahPNRA69ofM1izkPP`, { cache: 'force-cache' })
        const question = json.items[0]

        question.answers = question.answers ?? []
        
        question.answers.sort((a: any, b: any) => {
            return b.score * (b.is_accepted ? 1.15 : 1) - a.score * (a.is_accepted ? 1.15 : 1)
        })

        const answerElement = <div style="display: none;" innerHTML={question.body} /> as HTMLElement
        const showAnswerButtonElement = <button onClick={showAnswer} class={style.showPostButton}>
            Show question
        </button> as HTMLElement

        function showAnswer() {
            answerElement!.style.display = "initial"
            showAnswerButtonElement!.style.display = "none"
        }

        const answer = question.answers.length > 0 && question.answers[0]
        
        const preview =
        <div class={style.previewRoot}>
            <a href={question.link}><h1 innerHTML={question.title} class={style.postTitle}></h1></a>
            <div class={style.postHeader}>
                <div class={style.postTopbarElement}>
                    <span>Viewed </span> {prettifyNumber(question.view_count)} times
                </div>
                <div class={style.postTopbarElement}>
                    <span>Asked </span> {numberToLocaleDateString(question.creation_date*1000)}
                </div>
                <div class={style.postTopbarElement}>
                    <span>Modified </span> {numberToLocaleDateString(question.last_edit_date*1000)}
                </div>
            </div>
            {answerElement}
            {showAnswerButtonElement}
            {answer ?
                <>
                    <div id="answer" class={style.answer}>
                        <div class={style.postHeader}>
                            <div class={style.postTopbarElement}>
                                <span>Score </span>
                                {prettifyNumber(answer.score)}
                            </div>
                            <div class={style.postTopbarElement}>
                                <span>Asked </span>
                                {numberToLocaleDateString(answer.creation_date*1000)}
                            </div>
                            {answer.last_edit_date &&
                                <div class={style.postTopbarElement}>
                                    <span>Modified </span>
                                    {numberToLocaleDateString(answer.last_edit_date*1000)}
                                </div>
                            }
                            {answer.is_accepted &&
                                <div class={style.postTopbarElementExpanded} style="opacity: 1; font-size: 1.1rem;" title="Accepted answer">✅</div>
                            }
                        </div>
                        <div innerHTML={answer.body}></div>
                    </div>
                    <div class={style.postEndCenter}>
                        <a href={question.link} class={style.moreAnswers}>
                            More answers
                        </a>
                    </div>
                </>
                :
                <div class={style.answer} style="text-align: center; margin-top: 2rem;">
                    No answers
                </div>
            }
        </div>

        return preview as HTMLElement;
    }
}