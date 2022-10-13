import style from './integrations.module.css'
import { fetch, prettifyNumber, numberToLocaleDateString, numberToLocaleTimeString, htmlDecode } from '../utils'

export default {
    match: (url: URL) => url.hostname === "www.reddit.com" && /^\/r\/[\w_-]+\/comments\/[\w_-]+\/[\w_-]+\//.test(url.pathname),
    
    getComponent: async(url: URL): Promise<HTMLElement | undefined> => {
        
        let reqUrl = url.href

        const qi = reqUrl.indexOf("?")
        if (qi !== -1) reqUrl = reqUrl.substring(0, qi)

        reqUrl += ".json"

        const json = await fetch(reqUrl, { cache: 'force-cache' })

        let post = json[0].data.children[0].data
        post = post.crosspost_parent_list !== undefined ? post.crosspost_parent_list[0] : post

        const comments = json[1].data && json[1].data.children

        function commentComponent(comments: any[], depth: number) {
            return comments.map((comment, i) => {
                
                let hidden = depth >= 3 || i != 0;

                let contentElement = <div class={style.commentContent} innerHTML={htmlDecode(comment.data.body_html)!} /> as HTMLElement
                let childrenElement: HTMLElement | null = null

                if (comment.data.replies) {
                    childrenElement = <div class={style.commentChildren}>
                        {commentComponent(comment.data.replies.data.children, depth+1)}
                    </div> as HTMLElement
                }

                function changeVisibility(value: boolean) {
                    hidden = value;

                    if (childrenElement != null) {
                        childrenElement.style.display = hidden ? 'none' : 'initial'
                    }

                    contentElement.style.display = hidden ? 'none' : 'initial'
                }

                changeVisibility(hidden)

                return <>
                    <div class={style.comment}>
                        <div onClick={_ => changeVisibility(!hidden)} class={style.commentSpan}>
                            <div class={style.commentSpanBorder}></div>
                        </div>
                        <div class={style.commentMain}>
                            <div class={style.commentMeta}>
                                <a href={"https://www.reddit.com/user/"+comment.data.author}>
                                    u/{comment.data.author} 
                                </a>
                                <span> • {comment.data.score} votes</span>
                                <span> • {numberToLocaleDateString(comment.data.created*1000)} {numberToLocaleTimeString(comment.data.created*1000)}</span>
                            </div>
                            {contentElement}
                            {childrenElement != null && childrenElement}
                        </div>
                    </div>
                </>
            })
        }

        const preview = <>
            <div class={style.previewRoot}>
                <div class={style.postHeader}>
                    <div class={style.postTopbarElement}>
                        <span>Posted by </span>
                        <a href={"https://www.reddit.com/user/"+post.author}>u/{post.author} </a>
                        <span>on </span>
                        <a href={"https://www.reddit.com/r/"+post.subreddit}>r/{post.subreddit}</a>
                        <span> • {post.score} votes</span>
                        <span> • {numberToLocaleDateString(post.created*1000)} {numberToLocaleTimeString(post.created*1000)}</span>
                    </div>
                </div>
                <a href={post.url}><h1 innerHTML={post.title} class={style.postTitle}></h1></a>
                <div innerHTML={htmlDecode(post.selftext_html) ?? ""}></div>
                {commentComponent(comments, 0).slice(0, 7)}
            </div>
        </>

        return preview as HTMLElement;
    }
}