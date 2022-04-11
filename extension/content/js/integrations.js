
const REDDIT_MAX_REPLY_COUNT = 3

const stackexchangeSites = ["stackoverflow.com", "serverfault.com", "superuser.com", "meta.stackexchange.com", "webapps.stackexchange.com", "gaming.stackexchange.com", "webmasters.stackexchange.com", "cooking.stackexchange.com", "gamedev.stackexchange.com", "photo.stackexchange.com", "stats.stackexchange.com", "math.stackexchange.com", "diy.stackexchange.com", "gis.stackexchange.com", "tex.stackexchange.com", "askubuntu.com", "money.stackexchange.com", "english.stackexchange.com", "stackapps.com", "ux.stackexchange.com", "unix.stackexchange.com", "wordpress.stackexchange.com", "cstheory.stackexchange.com", "apple.stackexchange.com", "rpg.stackexchange.com", "bicycles.stackexchange.com", "softwareengineering.stackexchange.com", "electronics.stackexchange.com", "android.stackexchange.com", "boardgames.stackexchange.com", "physics.stackexchange.com", "homebrew.stackexchange.com", "security.stackexchange.com", "writing.stackexchange.com", "video.stackexchange.com", "graphicdesign.stackexchange.com", "dba.stackexchange.com", "scifi.stackexchange.com", "codereview.stackexchange.com", "codegolf.stackexchange.com", "quant.stackexchange.com", "pm.stackexchange.com", "skeptics.stackexchange.com", "fitness.stackexchange.com", "drupal.stackexchange.com", "mechanics.stackexchange.com", "parenting.stackexchange.com", "sharepoint.stackexchange.com", "music.stackexchange.com", "sqa.stackexchange.com", "judaism.stackexchange.com", "german.stackexchange.com", "japanese.stackexchange.com", "philosophy.stackexchange.com", "gardening.stackexchange.com", "travel.stackexchange.com", "crypto.stackexchange.com", "dsp.stackexchange.com", "french.stackexchange.com", "christianity.stackexchange.com", "bitcoin.stackexchange.com", "linguistics.stackexchange.com", "hermeneutics.stackexchange.com", "history.stackexchange.com", "bricks.stackexchange.com", "spanish.stackexchange.com", "scicomp.stackexchange.com", "movies.stackexchange.com", "chinese.stackexchange.com", "biology.stackexchange.com", "poker.stackexchange.com", "mathematica.stackexchange.com", "psychology.stackexchange.com", "outdoors.stackexchange.com", "martialarts.stackexchange.com", "sports.stackexchange.com", "academia.stackexchange.com", "cs.stackexchange.com", "workplace.stackexchange.com", "windowsphone.stackexchange.com", "chemistry.stackexchange.com", "chess.stackexchange.com", "raspberrypi.stackexchange.com", "russian.stackexchange.com", "islam.stackexchange.com", "salesforce.stackexchange.com", "patents.stackexchange.com", "genealogy.stackexchange.com", "robotics.stackexchange.com", "expressionengine.stackexchange.com", "politics.stackexchange.com", "anime.stackexchange.com", "magento.stackexchange.com", "ell.stackexchange.com", "sustainability.stackexchange.com", "tridion.stackexchange.com", "reverseengineering.stackexchange.com", "networkengineering.stackexchange.com", "opendata.stackexchange.com", "freelancing.stackexchange.com", "blender.stackexchange.com", "mathoverflow.net", "space.stackexchange.com", "sound.stackexchange.com", "astronomy.stackexchange.com", "tor.stackexchange.com", "pets.stackexchange.com", "ham.stackexchange.com", "italian.stackexchange.com", "pt.stackoverflow.com", "aviation.stackexchange.com", "ebooks.stackexchange.com", "alcohol.stackexchange.com", "softwarerecs.stackexchange.com", "arduino.stackexchange.com", "expatriates.stackexchange.com", "matheducators.stackexchange.com", "earthscience.stackexchange.com", "joomla.stackexchange.com", "datascience.stackexchange.com", "puzzling.stackexchange.com", "craftcms.stackexchange.com", "buddhism.stackexchange.com", "hinduism.stackexchange.com", "communitybuilding.stackexchange.com", "worldbuilding.stackexchange.com", "ja.stackoverflow.com", "emacs.stackexchange.com", "hsm.stackexchange.com", "economics.stackexchange.com", "lifehacks.stackexchange.com", "engineering.stackexchange.com", "coffee.stackexchange.com", "vi.stackexchange.com", "musicfans.stackexchange.com", "woodworking.stackexchange.com", "civicrm.stackexchange.com", "medicalsciences.stackexchange.com", "ru.stackoverflow.com", "rus.stackexchange.com", "mythology.stackexchange.com", "law.stackexchange.com", "opensource.stackexchange.com", "elementaryos.stackexchange.com", "portuguese.stackexchange.com", "computergraphics.stackexchange.com", "hardwarerecs.stackexchange.com", "es.stackoverflow.com", "3dprinting.stackexchange.com", "ethereum.stackexchange.com", "latin.stackexchange.com", "languagelearning.stackexchange.com", "retrocomputing.stackexchange.com", "crafts.stackexchange.com", "korean.stackexchange.com", "monero.stackexchange.com", "ai.stackexchange.com", "esperanto.stackexchange.com", "sitecore.stackexchange.com", "iot.stackexchange.com", "literature.stackexchange.com", "vegetarianism.stackexchange.com", "ukrainian.stackexchange.com", "devops.stackexchange.com", "bioinformatics.stackexchange.com", "cseducators.stackexchange.com", "interpersonal.stackexchange.com", "iota.stackexchange.com", "stellar.stackexchange.com", "conlang.stackexchange.com", "quantumcomputing.stackexchange.com", "eosio.stackexchange.com", "tezos.stackexchange.com", "or.stackexchange.com", "drones.stackexchange.com", "mattermodeling.stackexchange.com", "cardano.stackexchange.com", "proofassistants.stackexchange.com"];

hljs.addPlugin(new CopyButtonPlugin());

let integrations = [
    {
        "id":"stackexchange",
        "triggers": {
            "stackoverflow.com": ["developer.mozilla.org"],
        },
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
        "triggers": {
            "www.reddit.com": ["quora.com"],
        },
        "match": (url) => url.hostname === "www.reddit.com" && /^\/r\/[\w_-]+\/comments\/[\w_-]+\/[\w_-]+\//.test(url.pathname),
        "preview": async (url, root) => {
            let requestUrl = url.href

            let questionMarkI = requestUrl.indexOf("?")
            if (questionMarkI !== -1) requestUrl = requestUrl.substring(0, questionMarkI)

            requestUrl += ".json"

            let post = await fetchJson(requestUrl)

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
    },
    {
        "id": "rottentomatoes",
        "triggers": {
            "www.rottentomatoes.com": ["www.imdb.com"]
        },
        "match": (url) => url.hostname === "www.rottentomatoes.com" && url.pathname.startsWith("/m/"),
        "preview": async (url, root) => {
            let rottenTomatoesIdMatch = url.pathname.match(/\/(m\/[\w\-\_]+)/)
            
            if (!rottenTomatoesIdMatch || rottenTomatoesIdMatch.length < 2) {
                console.warn("No rotten tomatoes id was found in the url" + url.href);
                return
            }

            let wkentities = await fetchWikidataEntities('P1258', rottenTomatoesIdMatch[1])
            let moviedata = Object.values(wkentities)[0]

            console.log(moviedata);

            if (!moviedata.claims.P444) return

            let tomatometer = Number(moviedata.claims.P444[0].value.replace("%", ""))

            root.style.display = "flex"
            root.style.alignItems = "flex-start";
            root.style.justifyContent = "center";
            root.style.gap = "0.7em";
            root.style.flexDirection = "column";
            root.style.border = "1px solid var(--mrr-color-80)";
            root.style.padding = "1em 1.5em";
            root.style.width = "fit-content"

            let rthref = "https://www.rottentomatoes.com/" + rottenTomatoesIdMatch[1]
            let rtLink = root.new("a")
            rtLink.href = rthref


            let rtLinkUrl = rtLink.new(`div`, ("www.rottentomatoes.com/" + rottenTomatoesIdMatch[1]).replaceAll("/", " › "))
            rtLinkUrl.style.fontWeight = "500"
            rtLinkUrl.style.fontSize = "0.9em"
            rtLinkUrl.style.color = "inherit"
            rtLinkUrl.style.marginBottom = "0.3em"

            let publicationDate = new Date(moviedata.claims.P577[0].value.time)

            let movieTitle = rtLink.new("div", `${moviedata.claims.P1476[0].value.text} (${publicationDate.getFullYear()})`)
            // movieTitle.style.fontFamily = 'Arial, sans-serif'
            // movieTitle.style.textTransform = "uppercase"
            movieTitle.style.fontWeight = "700"
            // movieTitle.style.letterSpacing = "-0.05em"
            movieTitle.style.fontSize = "1.5em"

            let scoreContainer = root.new("div")
            scoreContainer.style.height = "2.4em"

            let freshSvg = `<?xml version="1.0" encoding="UTF-8"?><svg width="80px" height="80px" viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 59.1 (86144) - https://sketch.com --><title>Icons/Tomatometer &amp; AS/fresh</title><desc>Created with Sketch.</desc><defs><polygon id="path-1" points="0.000109100102 0.246970954 77.0827837 0.246970954 77.0827837 63.7145228 0.000109100102 63.7145228"></polygon></defs><g id="Icons/Tomatometer-&amp;-AS/fresh" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group"><rect id="Rectangle-Copy-2" fill="#000000" opacity="0" x="0" y="0" width="80" height="80"></rect><g id="RT_Fresh_Tomato_RGB-(1)" transform="translate(1.327801, 0.000000)"><g id="Group-3" transform="translate(0.000000, 16.265560)"><mask id="mask-2" fill="white"><use xlink:href="#path-1"></use></mask><g id="Clip-2"></g><path d="M77.0137759,27.0426556 C76.2423237,14.6741909 69.9521992,5.42041494 60.4876349,0.246970954 C60.5414108,0.548381743 60.273195,0.925145228 59.9678008,0.791701245 C53.7772614,-1.91634855 43.2753527,6.84780083 35.9365975,2.25825726 C35.9917012,3.90539419 35.6700415,11.940249 24.3515353,12.4063071 C24.0843154,12.4172614 23.9372614,12.1443983 24.1062241,11.9512033 C25.619917,10.2247303 27.1482158,5.85360996 24.9507054,3.5233195 C20.2446473,7.74041494 17.5117012,9.32746888 8.48829876,7.23319502 C2.71103734,13.2740249 -0.562655602,21.5419087 0.08,31.8413278 C1.39120332,52.86639 21.0848133,64.8846473 40.9165145,63.6471369 C60.746888,62.4106224 78.3253112,48.0677178 77.0137759,27.0426556" id="Fill-1" fill="#FA320A" mask="url(#mask-2)"></path></g><path d="M40.8717012,11.4648963 C44.946722,10.49361 56.6678838,11.3702905 60.4232365,16.3518672 C60.6486307,16.6506224 60.3312863,17.2159336 59.9678008,17.0572614 C53.7772614,14.3492116 43.2753527,23.113361 35.9365975,18.5238174 C35.9917012,20.1709544 35.6700415,28.2058091 24.3515353,28.6718672 C24.0843154,28.6828216 23.9372614,28.4099585 24.1062241,28.2167635 C25.619917,26.4902905 27.1478838,22.1191701 24.9507054,19.7888797 C19.8243983,24.3827386 17.0453112,25.8589212 5.91900415,22.8514523 C5.55485477,22.753195 5.67900415,22.1679668 6.06639004,22.020249 C8.16929461,21.2165975 12.933444,17.6965975 17.4406639,16.1450622 C18.2987552,15.8499585 19.1541909,15.6209129 19.9890456,15.4878008 C15.02639,15.0443154 12.7893776,14.3541909 9.63286307,14.8302075 C9.28697095,14.8823237 9.05195021,14.479668 9.26639004,14.2034855 C13.5193361,8.7253112 21.3540249,7.07087137 26.1878838,9.98107884 C23.2082988,6.28912863 20.8743568,3.34473029 20.8743568,3.34473029 L26.4046473,0.203485477 C26.4046473,0.203485477 28.6894606,5.30821577 30.3518672,9.02340249 C34.4657261,2.94506224 42.119834,2.38406639 45.3536929,6.69676349 C45.5455602,6.95302905 45.3450622,7.31751037 45.0247303,7.30987552 C42.3926971,7.24580913 40.9434025,9.63983402 40.833527,11.4605809 L40.8717012,11.4648963" id="Fill-4" fill="#00912D"></path></g></g></g></svg>`
            let rottenSvg = `<?xml version="1.0" encoding="UTF-8"?><svg width="80px" height="80px" viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 59.1 (86144) - https://sketch.com --><title>Icons/Tomatometer &amp; AS/rotten</title><desc>Created with Sketch.</desc><defs><polygon id="path-1" points="0 0.161950465 79.7417075 0.161950465 79.7417075 77.522807 0 77.522807"></polygon></defs><g id="Icons/Tomatometer-&amp;-AS/rotten" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group-5"><rect id="Rectangle-Copy" fill="#000000" opacity="0" x="0" y="0" width="80" height="80"></rect><g id="RT_Rotten_Splat_RGB-(1)" transform="translate(0.000000, 1.228070)"><g id="Group-3"><mask id="mask-2" fill="white"><use xlink:href="#path-1"></use></mask><g id="Clip-2"></g><path d="M71.4638596,70.225614 C56.3459649,71.0192982 53.2568421,53.7203509 47.325614,53.8435088 C44.7982456,53.8964912 42.8063158,56.5389474 43.6810526,59.6185965 C44.1621053,61.3115789 45.4964912,63.794386 46.337193,65.3350877 C49.302807,70.7719298 44.9185965,76.9245614 39.7880702,77.4449123 C31.2621053,78.3098246 27.705614,73.3638596 27.925614,68.3007018 C28.1729825,62.6168421 32.9922807,56.8091228 28.0494737,54.3378947 C22.8694737,51.7480702 18.6585965,61.8754386 13.7017544,64.1357895 C9.2154386,66.1817544 2.9877193,64.5954386 0.773684211,59.6136842 C-0.781403509,56.1129825 -0.498596491,49.3722807 6.42526316,46.8003509 C10.7501754,45.1940351 20.3880702,48.9010526 20.8824561,44.205614 C21.4522807,38.7929825 10.7575439,38.3364912 7.53754386,37.0385965 C1.84,34.7424561 -1.52280702,29.8291228 1.11192982,24.5582456 C3.08877193,20.6045614 8.90526316,18.9957895 13.3449123,20.7277193 C18.6635088,22.8024561 19.517193,28.3189474 22.2421053,30.6129825 C24.5894737,32.5901754 27.8021053,32.8375439 29.9031579,31.4782456 C31.4526316,30.4754386 31.9684211,28.2729825 31.3838596,26.2610526 C30.6084211,23.5901754 28.5505263,21.9235088 26.542807,20.2905263 C22.9698246,17.3859649 17.925614,14.8884211 20.9768421,6.96035088 C23.4778947,0.463157895 30.8133333,0.229122807 30.8133333,0.229122807 C33.7277193,-0.0985964912 36.3375439,0.781403509 38.4642105,2.68140351 C41.3073684,5.22140351 41.8610526,8.61649123 41.3852632,12.2385965 C40.9505263,15.5449123 39.7803509,18.4407018 39.1701754,21.7164912 C38.4621053,25.5196491 40.4947368,29.3519298 44.3603509,29.5010526 C49.4449123,29.6975439 50.9694737,25.7894737 51.5915789,23.3122807 C52.5024561,19.6877193 53.6978947,16.322807 57.0617544,14.2035088 C61.8894737,11.1617544 68.5954386,11.8284211 71.7066667,17.674386 C74.1677193,22.3 73.3775439,28.6677193 69.6024561,32.1449123 C67.9087719,33.7045614 65.8722807,34.254386 63.6694737,34.2698246 C60.5105263,34.2922807 57.3529825,34.2147368 54.4207018,35.6929825 C52.4245614,36.6989474 51.5547368,38.3382456 51.5550877,40.5354386 C51.5550877,42.6768421 52.6698246,44.0754386 54.4761404,44.985614 C57.8782456,46.7003509 61.6336842,47.0508772 65.3087719,47.694386 C70.6382456,48.6277193 75.3242105,50.5049123 78.3326316,55.4505263 C78.3596491,55.4940351 78.3859649,55.5378947 78.4115789,55.5821053 C81.8666667,61.4375439 78.2533333,69.8687719 71.4638596,70.225614" id="Fill-1" fill="#0AC855" mask="url(#mask-2)"></path></g></g></g></g></svg>`

            scoreContainer.style.display = "flex"
            scoreContainer.style.alignItems = "center";
            scoreContainer.style.justifyContent = "center";
            scoreContainer.style.gap = "1em";

            let freshness = scoreContainer.new(`div`, tomatometer >= 60 ? freshSvg : rottenSvg).firstElementChild
            freshness.style.width = "2.4em"
            freshness.style.height = "2.4em"

            let tomatometerText = scoreContainer.new("h1", tomatometer + "%")
            tomatometerText.style.fontSize = "2.4em"
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
            console.log("Preview match");
            return preview
        }
    }

    console.log("No preview");
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
