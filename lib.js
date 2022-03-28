
const REDDIT_MAX_REPLY_DEPTH = 6
const REDDIT_MAX_REPLY_COUNT = 3

// const REDDIT_EXPAND_REPLY_DEPTH = 2
// const REDDIT_EXPAND_REPLY_COUNT = 2

const stackexchangeSites = ["stackoverflow.com", "serverfault.com", "superuser.com", "meta.stackexchange.com", "webapps.stackexchange.com", "gaming.stackexchange.com", "webmasters.stackexchange.com", "cooking.stackexchange.com", "gamedev.stackexchange.com", "photo.stackexchange.com", "stats.stackexchange.com", "math.stackexchange.com", "diy.stackexchange.com", "gis.stackexchange.com", "tex.stackexchange.com", "askubuntu.com", "money.stackexchange.com", "english.stackexchange.com", "stackapps.com", "ux.stackexchange.com", "unix.stackexchange.com", "wordpress.stackexchange.com", "cstheory.stackexchange.com", "apple.stackexchange.com", "rpg.stackexchange.com", "bicycles.stackexchange.com", "softwareengineering.stackexchange.com", "electronics.stackexchange.com", "android.stackexchange.com", "boardgames.stackexchange.com", "physics.stackexchange.com", "homebrew.stackexchange.com", "security.stackexchange.com", "writing.stackexchange.com", "video.stackexchange.com", "graphicdesign.stackexchange.com", "dba.stackexchange.com", "scifi.stackexchange.com", "codereview.stackexchange.com", "codegolf.stackexchange.com", "quant.stackexchange.com", "pm.stackexchange.com", "skeptics.stackexchange.com", "fitness.stackexchange.com", "drupal.stackexchange.com", "mechanics.stackexchange.com", "parenting.stackexchange.com", "sharepoint.stackexchange.com", "music.stackexchange.com", "sqa.stackexchange.com", "judaism.stackexchange.com", "german.stackexchange.com", "japanese.stackexchange.com", "philosophy.stackexchange.com", "gardening.stackexchange.com", "travel.stackexchange.com", "crypto.stackexchange.com", "dsp.stackexchange.com", "french.stackexchange.com", "christianity.stackexchange.com", "bitcoin.stackexchange.com", "linguistics.stackexchange.com", "hermeneutics.stackexchange.com", "history.stackexchange.com", "bricks.stackexchange.com", "spanish.stackexchange.com", "scicomp.stackexchange.com", "movies.stackexchange.com", "chinese.stackexchange.com", "biology.stackexchange.com", "poker.stackexchange.com", "mathematica.stackexchange.com", "psychology.stackexchange.com", "outdoors.stackexchange.com", "martialarts.stackexchange.com", "sports.stackexchange.com", "academia.stackexchange.com", "cs.stackexchange.com", "workplace.stackexchange.com", "windowsphone.stackexchange.com", "chemistry.stackexchange.com", "chess.stackexchange.com", "raspberrypi.stackexchange.com", "russian.stackexchange.com", "islam.stackexchange.com", "salesforce.stackexchange.com", "patents.stackexchange.com", "genealogy.stackexchange.com", "robotics.stackexchange.com", "expressionengine.stackexchange.com", "politics.stackexchange.com", "anime.stackexchange.com", "magento.stackexchange.com", "ell.stackexchange.com", "sustainability.stackexchange.com", "tridion.stackexchange.com", "reverseengineering.stackexchange.com", "networkengineering.stackexchange.com", "opendata.stackexchange.com", "freelancing.stackexchange.com", "blender.stackexchange.com", "mathoverflow.net", "space.stackexchange.com", "sound.stackexchange.com", "astronomy.stackexchange.com", "tor.stackexchange.com", "pets.stackexchange.com", "ham.stackexchange.com", "italian.stackexchange.com", "pt.stackoverflow.com", "aviation.stackexchange.com", "ebooks.stackexchange.com", "alcohol.stackexchange.com", "softwarerecs.stackexchange.com", "arduino.stackexchange.com", "expatriates.stackexchange.com", "matheducators.stackexchange.com", "earthscience.stackexchange.com", "joomla.stackexchange.com", "datascience.stackexchange.com", "puzzling.stackexchange.com", "craftcms.stackexchange.com", "buddhism.stackexchange.com", "hinduism.stackexchange.com", "communitybuilding.stackexchange.com", "worldbuilding.stackexchange.com", "ja.stackoverflow.com", "emacs.stackexchange.com", "hsm.stackexchange.com", "economics.stackexchange.com", "lifehacks.stackexchange.com", "engineering.stackexchange.com", "coffee.stackexchange.com", "vi.stackexchange.com", "musicfans.stackexchange.com", "woodworking.stackexchange.com", "civicrm.stackexchange.com", "medicalsciences.stackexchange.com", "ru.stackoverflow.com", "rus.stackexchange.com", "mythology.stackexchange.com", "law.stackexchange.com", "opensource.stackexchange.com", "elementaryos.stackexchange.com", "portuguese.stackexchange.com", "computergraphics.stackexchange.com", "hardwarerecs.stackexchange.com", "es.stackoverflow.com", "3dprinting.stackexchange.com", "ethereum.stackexchange.com", "latin.stackexchange.com", "languagelearning.stackexchange.com", "retrocomputing.stackexchange.com", "crafts.stackexchange.com", "korean.stackexchange.com", "monero.stackexchange.com", "ai.stackexchange.com", "esperanto.stackexchange.com", "sitecore.stackexchange.com", "iot.stackexchange.com", "literature.stackexchange.com", "vegetarianism.stackexchange.com", "ukrainian.stackexchange.com", "devops.stackexchange.com", "bioinformatics.stackexchange.com", "cseducators.stackexchange.com", "interpersonal.stackexchange.com", "iota.stackexchange.com", "stellar.stackexchange.com", "conlang.stackexchange.com", "quantumcomputing.stackexchange.com", "eosio.stackexchange.com", "tezos.stackexchange.com", "or.stackexchange.com", "drones.stackexchange.com", "mattermodeling.stackexchange.com", "cardano.stackexchange.com", "proofassistants.stackexchange.com"];

HTMLElement.prototype.new = function (selector, innerHTML) {
    
    let tag = selector.match(/[\w-]+/)[0]
    if (!tag) throw "Doesn't contain a tag"

    let element = document.createElement(tag);
    
    let properties = selector.match(/\[[^\]]+\]/g)
    if (!!properties) {
        for (const property of properties) {
            let kvpair = property.replace(/[\[\]]/g, "").split("=")
            element[kvpair[0]] = (kvpair[1] && kvpair[1].replace(/['"]/g, "")) || ""
        }
    }

    selector = selector.replace(/\[[^\]]+\]/g, "")

    let classes = selector.match(/\.([\w-]+)/g)
    if (!!classes) classes.forEach((_class) => element.classList.add(_class.slice(1)))

    let idMatch = selector.match(/#([\w-]+)/)
    if (!!idMatch) element.id = idMatch[0].slice(1);

    if (!!innerHTML) element.innerHTML = innerHTML

    this.appendChild(element)

    return element;
}

var ranges = [
    { divider: 1e18, suffix: 'E' },
    { divider: 1e15, suffix: 'P' },
    { divider: 1e12, suffix: 'T' },
    { divider: 1e9, suffix: 'G' },
    { divider: 1e6, suffix: 'M' },
    { divider: 1e3, suffix: 'k' }
];

function formatNumber(n) {
    for (var i = 0; i < ranges.length; i++) {
        if (n >= ranges[i].divider) {
            return Math.round(n / ranges[i].divider).toString() + ranges[i].suffix;
        }
    }
    return n.toString();
}

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

let generatedIds = 0

function makeid() {
    generatedIds += 1
    return "gid-"+generatedIds
}

hljs.addPlugin(new CopyButtonPlugin());

let integrations = [
    {
        "match": (url) => stackexchangeSites.indexOf(url.hostname) !== -1 && (url.pathname.startsWith("/questions/") || url.pathname.startsWith("/q/")),
        "preview": async (url, root) => {

            let questionId = url.pathname.split("/")[2]
            let site = url.hostname

            let res = await fetch(`https://api.stackexchange.com/2.2/questions/${questionId}?&site=${site}&filter=%21T%2ahPNRA69ofM1izkPP`)
            let stackdata = (await res.json()).items[0]

            let meta = root.new(`div.meta-container`)

            meta.new(`span`, "Asked " + moment(stackdata.creation_date * 1000).fromNow())
            meta.new(`span`, "•")
            meta.new(`span`, "Modified " + moment(stackdata.last_activity_date * 1000).fromNow())
            meta.new(`span`, "•")
            meta.new(`span`, "Viewed " + formatNumber(stackdata.view_count) + " times")

            let titleLink = root.new("a")
            titleLink.href = url.href

            let title = titleLink.new(`h3`, stackdata.title)
            title.style.fontSize = "20px"
            title.style.fontWeight = "400"
            title.style.margin = "6px 0 -2px 0"

            // let postBody = root.new(`div.clickexpand[style='color: #444']`, stackdata.body)
            // postBody.addEventListener("click", (e) => e.target.setAttribute("show", ""))

            let answers = stackdata.answers.sort((a,b) => b.score - a.score);

            let topanswer = answers[0]
            console.log(topanswer);

            let answerBody = root.new(`div`, topanswer.body)

            let moreLink = root.new(`a`, "All replies...")
            moreLink.href = url.href
            moreLink.style.fontSize = "16px"
            moreLink.style.textAlign = "center"
            moreLink.style.display = "block"
            moreLink.style.marginTop = "1em";

        }
    },
    {
        "match": (url) => url.hostname === "www.reddit.com" && /^\/r\/[\w_-]+\/comments\/[\w_-]+\/[\w_-]+\//.test(url.pathname),
        "preview": async (url, root) => {
            let requestUrl = url.href

            let questionMarkI = requestUrl.indexOf("?")
            if (questionMarkI !== -1) requestUrl = requestUrl.substring(0, questionMarkI)

            requestUrl += ".json"

            let post = await (new Promise((resolve, reject) => {
                chrome.runtime.sendMessage({ type: "fetch", url: requestUrl }, (response) => {
                    resolve(response);
                });
            }));

            if (post.length === undefined) return null

            let meta = root.new(`div.meta-container`)

            meta.new(`span`, "Posted by u/" + post[0].data.children[0].data.author + " " + moment(post[0].data.children[0].data.created_utc * 1000).fromNow())
            meta.new(`span`, "•")
            meta.new(`span`, formatNumber(post[0].data.children[0].data.score) + " Upvotes")

            let titleLink = root.new("a")
            titleLink.href = url.href

            let title = titleLink.new(`h3`, htmlDecode(post[0].data.children[0].data.title))
            title.style.fontFamily = "arial,sans-serif;"
            title.style.fontSize = "1.2em"
            title.style.fontWeight = "400"
            title.style.margin = "6px 0 -2px 0"

            // let postBody = root.new(`div.clickexpand[style='color: #444']`, htmlDecode(post[0].data.children[0].data.selftext_html))
            // postBody.addEventListener("click", (e) => e.target.setAttribute("show", ""))

            function crawlComments(root, comments, depth) {

                comments = comments.filter(comment => comment.kind == "t1")
                comments = comments.sort((a,b) => b.data.score - a.data.score);
                
                if (typeof depth != "number") depth = 0;

                for (let i = 0; i < comments.length; i++) { //REDDIT_MAX_REPLY_COUNT

                    const comment = comments[i];

                    let commentRoot = root.new(`div.comment-root`)
                    
                    let commentToggle = commentRoot.new(`input.comment-toggle[type=checkbox]`)
                    commentToggle.checked = !(i == 0 && depth < 2)
                    commentToggle.id = "comment-toggle-" + makeid()
                    
                    let commentLabel = commentRoot.new(`label.comment-border`)
                    commentLabel.setAttribute("for", commentToggle.id)
                    commentLabel.new(`div.comment-border-g`, " ")
                    
                    let commentMain = commentRoot.new(`div.comment-main`)
                    
                    let commentMeta = commentMain.new(`div.meta-container.comment-meta`)
                    commentMeta.style.fontStyle = "16px;"
                    
                    commentMeta.new(`span`, "u/" + comment.data.author)
                    commentMeta.new(`span`, "•")
                    commentMeta.new(`span`, moment(comment.data.created_utc * 1000).fromNow())
                    commentMeta.new(`span`, "•")
                    commentMeta.new(`span`, formatNumber(comment.data.score) + " Upvotes")
                    commentMeta.new(`span.comment-hidden`, '[hidden]')
                    
                    commentMain.new(`div.comment-body`, htmlDecode(comment.data.body_html))
                    
                    if (comment.data.replies != "") {
                        crawlComments(commentMain, comment.data.replies.data.children, depth + 1)
                    } 
                    
                    if (i == REDDIT_MAX_REPLY_COUNT - 1 && depth == 0) {
                        let moreLink = root.new(`a`, "All replies...")
                        moreLink.href = "https://www.reddit.com" + post[0].data.children[0].data.permalink
                        moreLink.style.fontSize = "16px"
                        moreLink.style.textAlign = "left"
                        moreLink.style.display = "block"
                        moreLink.style.marginTop = "1em";
                        break
                    }
                }
            }

            console.log(post[1].data.children);

            crawlComments(root, post[1].data.children);
        }
    }
]

function getPreviewGenerator(url) {
    let match = integrations.find((integration) => integration.match(url))
    return match && (
        async () => {

            let rootContainer = document.createElement("div")
            let shadowRoot = rootContainer.attachShadow({ "mode": "open" })

            let root = document.createElement("div")
            var inject_sheet = root.new('style')

            // Github theme
            inject_sheet.innerHTML += `.hljs{color:#24292e;background:#fff}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#d73a49}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#6f42c1}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#005cc5}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#032f62}.hljs-built_in,.hljs-symbol{color:#e36209}.hljs-code,.hljs-comment,.hljs-formula{color:#6a737d}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#22863a}.hljs-subst{color:#24292e}.hljs-section{color:#005cc5;font-weight:700}.hljs-bullet{color:#735c0f}.hljs-emphasis{color:#24292e;font-style:italic}.hljs-strong{color:#24292e;font-weight:700}.hljs-addition{color:#22863a;background-color:#f0fff4}.hljs-deletion{color:#b31d28;background-color:#ffeef0}`
            inject_sheet.innerHTML += `pre code.hljs {display: block;overflow-x: auto;padding: 1em;border-radius: 3px;} .hljs {background: #f3f3f3;color: #444;}`
            // Copy to clipboard plugin
            inject_sheet.innerHTML += `.hljs-copy-wrapper{position:relative;overflow:hidden}.hljs-copy-wrapper:hover .hljs-copy-button,.hljs-copy-button:focus{transform:translateX(0)}.hljs-copy-button{position:absolute;transform:translateX(calc(100% + 1.125em));top:1em;right:1em;width:2rem;height:2rem;text-indent:-9999px;color:#fff;border-radius:.25rem;border:1px solid #ffffff22;background-color:#2d2b57;background-color:var(--hljs-theme-background);background-image:url('data:image/svg+xml;utf-8,<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 5C5.73478 5 5.48043 5.10536 5.29289 5.29289C5.10536 5.48043 5 5.73478 5 6V20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21H18C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20V6C19 5.73478 18.8946 5.48043 18.7071 5.29289C18.5196 5.10536 18.2652 5 18 5H16C15.4477 5 15 4.55228 15 4C15 3.44772 15.4477 3 16 3H18C18.7956 3 19.5587 3.31607 20.1213 3.87868C20.6839 4.44129 21 5.20435 21 6V20C21 20.7957 20.6839 21.5587 20.1213 22.1213C19.5587 22.6839 18.7957 23 18 23H6C5.20435 23 4.44129 22.6839 3.87868 22.1213C3.31607 21.5587 3 20.7957 3 20V6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H8C8.55228 3 9 3.44772 9 4C9 4.55228 8.55228 5 8 5H6Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 3C7 1.89543 7.89543 1 9 1H15C16.1046 1 17 1.89543 17 3V5C17 6.10457 16.1046 7 15 7H9C7.89543 7 7 6.10457 7 5V3ZM15 3H9V5H15V3Z" fill="white"/></svg>');background-repeat:no-repeat;background-position:center;transition:background-color 200ms ease,transform 200ms ease-out}.hljs-copy-button:hover{border-color:#ffffff44}.hljs-copy-button:active{border-color:#ffffff66}.hljs-copy-button[data-copied="true"]{text-indent:0;width:auto;background-image:none}@media(prefers-reduced-motion){.hljs-copy-button{transition:none}}.hljs-copy-alert{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}`
            inject_sheet.innerHTML += `.hljs-copy-button {background-color: #c8c8c8;}`

            inject_sheet.innerHTML += `
                .clickexpand {
                    max-height: 100px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    content: "";
                    position: relative;
                }

                .clickexpand[show] {
                    max-height: min-content;
                }

                .clickexpand:not([show]):before {
                    content: '';
                    width: 100%;
                    height: 100%;    
                    position: absolute;
                    left: 0;
                    top: 0;
                    background: linear-gradient(transparent 0px, #fff);
                    cursor: pointer;
                    z-index: 1;
                }

                .preview-container {
                    /* border: 1px solid #dadce0; */
                    /* background: #fff; */
                    /* box-shadow: 0px 2px 6px #00000025; */
                    border-radius: 6px;
                    width: 100%;
                    font-family: Google Sans, arial, sans-serif;
                    font-size: 15px;
                    padding: 14px 12px;
                }
                
                .meta-container {
                    display: flex;
                    gap: 4px;
                    font-size: 14px;
                    color: #777;
                }

                .comment-toggle {
                    display: none;
                }

                .comment-meta {
                    font-size: 14px;
                    line-height: 1.8em;
                }
            
                .comment-root {
                    display: flex;
                    align-items: stretch;
                    margin: 15px 0 10px -8px;
                    word-break: break-word;
                }
            
                .comment-border {
                    padding: 0 8px;
                }

                .comment-toggle:not(:checked) ~ .comment-main {
                    margin-bottom: -9.8px;
                }

                .comment-body {
                    margin-top: -10px;
                }

                .comment-main {
                    width: calc(100% - 20px);
                }
            
                .comment-border-g {
                    border: none;
                    border-left: 2px solid #d9dde1;
                    margin: 0;
                    height: 100%;
                    width: 2px;
                }
            
                .comment-border:hover > .comment-border-g {
                    border-color: #565d62;
                }

                .comment-border:active > .comment-border-g {
                    border-color: #acb0b5;
                }

                .comment-border:hover {
                    cursor: pointer;
                    border-color: #014980;
                }
            
                .comment-toggle:checked ~ .comment-main > .comment-meta ~ * {
                    display: none;
                }

                .comment-toggle:not(:checked) ~ .comment-main > .comment-meta .comment-hidden {
                    display: none;
                }

                hr {
                    border: none;
                    border-bottom: 1px solid #aaa;
                }

                a {
                    color: #1a0dab;
                    text-decoration: none;
                }

                a:hover {
                    text-decoration: underline;
                }
            `
            root.classList.add("preview-container")
            shadowRoot.appendChild(root)

            await match.preview(url, root)

            root.querySelectorAll('pre code').forEach((el) => {
                hljs.highlightElement(el);
            });

            return rootContainer
        }
    )
}
