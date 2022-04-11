
const REDDIT_MAX_REPLY_COUNT = 3

const stackexchangeSites = ["stackoverflow.com", "serverfault.com", "superuser.com", "meta.stackexchange.com", "webapps.stackexchange.com", "gaming.stackexchange.com", "webmasters.stackexchange.com", "cooking.stackexchange.com", "gamedev.stackexchange.com", "photo.stackexchange.com", "stats.stackexchange.com", "math.stackexchange.com", "diy.stackexchange.com", "gis.stackexchange.com", "tex.stackexchange.com", "askubuntu.com", "money.stackexchange.com", "english.stackexchange.com", "stackapps.com", "ux.stackexchange.com", "unix.stackexchange.com", "wordpress.stackexchange.com", "cstheory.stackexchange.com", "apple.stackexchange.com", "rpg.stackexchange.com", "bicycles.stackexchange.com", "softwareengineering.stackexchange.com", "electronics.stackexchange.com", "android.stackexchange.com", "boardgames.stackexchange.com", "physics.stackexchange.com", "homebrew.stackexchange.com", "security.stackexchange.com", "writing.stackexchange.com", "video.stackexchange.com", "graphicdesign.stackexchange.com", "dba.stackexchange.com", "scifi.stackexchange.com", "codereview.stackexchange.com", "codegolf.stackexchange.com", "quant.stackexchange.com", "pm.stackexchange.com", "skeptics.stackexchange.com", "fitness.stackexchange.com", "drupal.stackexchange.com", "mechanics.stackexchange.com", "parenting.stackexchange.com", "sharepoint.stackexchange.com", "music.stackexchange.com", "sqa.stackexchange.com", "judaism.stackexchange.com", "german.stackexchange.com", "japanese.stackexchange.com", "philosophy.stackexchange.com", "gardening.stackexchange.com", "travel.stackexchange.com", "crypto.stackexchange.com", "dsp.stackexchange.com", "french.stackexchange.com", "christianity.stackexchange.com", "bitcoin.stackexchange.com", "linguistics.stackexchange.com", "hermeneutics.stackexchange.com", "history.stackexchange.com", "bricks.stackexchange.com", "spanish.stackexchange.com", "scicomp.stackexchange.com", "movies.stackexchange.com", "chinese.stackexchange.com", "biology.stackexchange.com", "poker.stackexchange.com", "mathematica.stackexchange.com", "psychology.stackexchange.com", "outdoors.stackexchange.com", "martialarts.stackexchange.com", "sports.stackexchange.com", "academia.stackexchange.com", "cs.stackexchange.com", "workplace.stackexchange.com", "windowsphone.stackexchange.com", "chemistry.stackexchange.com", "chess.stackexchange.com", "raspberrypi.stackexchange.com", "russian.stackexchange.com", "islam.stackexchange.com", "salesforce.stackexchange.com", "patents.stackexchange.com", "genealogy.stackexchange.com", "robotics.stackexchange.com", "expressionengine.stackexchange.com", "politics.stackexchange.com", "anime.stackexchange.com", "magento.stackexchange.com", "ell.stackexchange.com", "sustainability.stackexchange.com", "tridion.stackexchange.com", "reverseengineering.stackexchange.com", "networkengineering.stackexchange.com", "opendata.stackexchange.com", "freelancing.stackexchange.com", "blender.stackexchange.com", "mathoverflow.net", "space.stackexchange.com", "sound.stackexchange.com", "astronomy.stackexchange.com", "tor.stackexchange.com", "pets.stackexchange.com", "ham.stackexchange.com", "italian.stackexchange.com", "pt.stackoverflow.com", "aviation.stackexchange.com", "ebooks.stackexchange.com", "alcohol.stackexchange.com", "softwarerecs.stackexchange.com", "arduino.stackexchange.com", "expatriates.stackexchange.com", "matheducators.stackexchange.com", "earthscience.stackexchange.com", "joomla.stackexchange.com", "datascience.stackexchange.com", "puzzling.stackexchange.com", "craftcms.stackexchange.com", "buddhism.stackexchange.com", "hinduism.stackexchange.com", "communitybuilding.stackexchange.com", "worldbuilding.stackexchange.com", "ja.stackoverflow.com", "emacs.stackexchange.com", "hsm.stackexchange.com", "economics.stackexchange.com", "lifehacks.stackexchange.com", "engineering.stackexchange.com", "coffee.stackexchange.com", "vi.stackexchange.com", "musicfans.stackexchange.com", "woodworking.stackexchange.com", "civicrm.stackexchange.com", "medicalsciences.stackexchange.com", "ru.stackoverflow.com", "rus.stackexchange.com", "mythology.stackexchange.com", "law.stackexchange.com", "opensource.stackexchange.com", "elementaryos.stackexchange.com", "portuguese.stackexchange.com", "computergraphics.stackexchange.com", "hardwarerecs.stackexchange.com", "es.stackoverflow.com", "3dprinting.stackexchange.com", "ethereum.stackexchange.com", "latin.stackexchange.com", "languagelearning.stackexchange.com", "retrocomputing.stackexchange.com", "crafts.stackexchange.com", "korean.stackexchange.com", "monero.stackexchange.com", "ai.stackexchange.com", "esperanto.stackexchange.com", "sitecore.stackexchange.com", "iot.stackexchange.com", "literature.stackexchange.com", "vegetarianism.stackexchange.com", "ukrainian.stackexchange.com", "devops.stackexchange.com", "bioinformatics.stackexchange.com", "cseducators.stackexchange.com", "interpersonal.stackexchange.com", "iota.stackexchange.com", "stellar.stackexchange.com", "conlang.stackexchange.com", "quantumcomputing.stackexchange.com", "eosio.stackexchange.com", "tezos.stackexchange.com", "or.stackexchange.com", "drones.stackexchange.com", "mattermodeling.stackexchange.com", "cardano.stackexchange.com", "proofassistants.stackexchange.com"];

hljs.addPlugin(new CopyButtonPlugin());

let integrations = [
    {
        "id":"stackexchange",
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

            if (!!stackdata.answers) {
                let answers = stackdata.answers.sort((a,b) => b.score - a.score);
                let topanswer = answers[0]
                let answerBody = root.new(`div`, topanswer.body)
                
                if (stackdata.answers.length > 1) {
                    let moreLink = root.new(`a`, "All replies...")
                    moreLink.href = url.href
                    moreLink.style.fontSize = "16px"
                    moreLink.style.textAlign = "center"
                    moreLink.style.display = "block"
                    moreLink.style.marginTop = "1em";
                }
            } else {
                let alert = root.new(`p`, "No solutions")
                alert.style.fontSize = "16px"
                alert.style.textAlign = "center"
                alert.style.display = "block"
                alert.style.marginTop = "1em";
            }



        }
    },
    {
        "id":"reddit",
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

            let postData = post[0].data.children[0].data
            postData = postData.crosspost_parent_list !== undefined ? postData.crosspost_parent_list[0] : postData

            if (post.length === undefined) return null

            let meta = root.new(`div.meta-container`)

            let section0 = meta.new(`div`)
            section0.new(`span`, "Posted by ")
            let authorLink = section0.new(`a`, "u/" + postData.author + " ")
            authorLink.style.color = "inherit"
            authorLink.href = "https://www.reddit.com/user/" + postData.author
            section0.new(`span`, moment(postData.created_utc * 1000).fromNow())

            meta.new(`div`, "•")
            
            let section1 = meta.new(`div`)
            let subredditLink = section1.new(`a`, "r/"+postData.subreddit)
            subredditLink.style.color = "inherit"
            subredditLink.href = "https://www.reddit.com/r/"+postData.subreddit
            
            meta.new(`div`, "•")
            
            meta.new(`div`, formatNumber(postData.score) + " upvotes")

            let titleLink = root.new("a")
            titleLink.href = url.href

            let title = titleLink.new(`h3.reddit-title-link`, htmlDecode(postData.title))

            function crawlComments(root, comments, depth) {

                comments = comments.filter(comment => comment.kind == "t1")
                comments = comments.sort((a,b) => b.data.score - a.data.score);
                
                if (typeof depth != "number") depth = 0;

                for (let i = 0; i < comments.length; i++) { //REDDIT_MAX_REPLY_COUNT

                    const comment = comments[i];
                    
                    let hidePost;
                    let expandPost;
                    let isImagePost = false;

                    if (depth == 0 && i == 0) {

                        let urlSplit = postData.url.split("/")
                        let lastElement = urlSplit[urlSplit.length - 1]

                        if (lastElement !== "") {
                            let fileSplit = lastElement.split(".")
                            
                            if (fileSplit.length > 1 && ["apng","avif","bmp","wmf","gif","ico","jpg","jpeg","jpe","jif","jfif","png","svg","svgz","tif","tiff","webp","xbm"].indexOf(fileSplit[fileSplit.length - 1].toLowerCase())) {
                                isImagePost = true
                            }
                        }

                        let postCommentScoreRatio = comment.data.score / postData.score

                        hidePost = postCommentScoreRatio > 0.38
                        expandPost = !hidePost && postCommentScoreRatio < 0.22

                        if (true){//(!hidePost) {
                            if (isImagePost) {
                                let postBodyImg = root.new(`img`)
                                postBodyImg.src = postData.url
                            } else {
                                let postBody = root.new(`div`, htmlDecode(postData.selftext_html))
                                // postBody.style.color = "#444"
        
                                if (!expandPost) {
                                    postBody.classList.add("clickexpand")
                                    postBody.addEventListener("click", (e) => e.target.setAttribute("show", ""))
                                }
                            }
                        }
                    }


                    let commentRoot = root.new(`div.comment-root`)
                    
                    let expandComment = (i == 0 && depth < 2) && !expandPost && !isImagePost

                    let commentToggle = commentRoot.new(`input.comment-toggle[type=checkbox]`)
                    commentToggle.checked = !expandComment
                    commentToggle.id = "comment-toggle-" + makeid()
                    
                    let commentLabel = commentRoot.new(`label.comment-border`)
                    commentLabel.setAttribute("for", commentToggle.id)
                    commentLabel.new(`div.comment-border-g`, " ")
                    
                    let commentMain = commentRoot.new(`div.comment-main`)
                    let commentMeta = commentMain.new(`div.meta-container.comment-meta`)
                    commentMeta.style.fontStyle = "16px"
                                        
                    let authorLink = commentMeta.new(`a`, "u/" + comment.data.author + " ")
                    authorLink.style.color = "inherit"
                    authorLink.href = "https://www.reddit.com/user/" + comment.data.author

                    commentMeta.new(`span`, moment(comment.data.created_utc * 1000).fromNow())
                    commentMeta.new(`div`, "•")
                    commentMeta.new(`div`, formatNumber(comment.data.score) + " Upvotes")

                    let unhide = commentMeta.new(`label.comment-hidden`)
                    unhide.setAttribute("for", commentToggle.id)
                    
                    commentMain.new(`div.comment-body`, htmlDecode(comment.data.body_html))
                    
                    if (comment.data.replies != "") {
                        crawlComments(commentMain, comment.data.replies.data.children, depth + 1)
                    } 
                    
                    if (i == REDDIT_MAX_REPLY_COUNT - 1 && depth == 0) {
                        let moreLink = root.new(`a`, "All replies...")
                        moreLink.href = "https://www.reddit.com" + postData.permalink
                        moreLink.style.fontSize = "16px"
                        moreLink.style.textAlign = "center"
                        moreLink.style.display = "block"
                        moreLink.style.marginTop = "1em";
                        break
                    }
                }
            }

            crawlComments(root, post[1].data.children);
        }
    }
]

function findTriggerDomainMatches(urlstr) {
    let url = new URL(urlstr)
}

async function newValidPreview(urls, theme) {
    for (let i = 0; i < urls.length; i++) {
        let previewGenerator = await getPreviewGenerator(urls[i])
        if (previewGenerator != null) {
            let preview = await previewGenerator()
            let sheet = document.createElement('style')
            sheet.innerHTML = theme
            preview.shadowRoot.appendChild(sheet)
            return preview
        }
    }
    return
}

async function getPreviewGenerator(url) {
    let match = await integrations.findAsync(async (integration) => await getSetting(integration.id) && integration.match(url))
    return match && (
        async () => {
            this.id = match.id

            let rootContainer = document.createElement("div")
            let shadowRoot = rootContainer.attachShadow({ "mode": "open" })

            let root = document.createElement("div")
            root.style.visibility = "hidden";
            root.style.opacity = "0";
            root.classList.add('preview-container')

            root.new(`link[type="text/css"][rel="stylesheet"]`).href = chrome.runtime.getURL("content/css/github.css");
            root.new(`link[type="text/css"][rel="stylesheet"]`).href = chrome.runtime.getURL("content/css/highlightjs-copy.css");
            root.new(`link[type="text/css"][rel="stylesheet"]`).href = chrome.runtime.getURL("content/css/preview.css");

            shadowRoot.appendChild(root)

            await match.preview(url, root)

            root.querySelectorAll('pre code').forEach((el) => {
                hljs.highlightElement(el);
            });

            return rootContainer
        }
    )
}
