
const REDDIT_MAX_REPLY_DEPTH = 6
const REDDIT_MAX_REPLY_COUNT = 3

// const REDDIT_EXPAND_REPLY_DEPTH = 2
// const REDDIT_EXPAND_REPLY_COUNT = 2

function parseColor(c){
    c= c.toLowerCase();
    var colornames={
        aliceblue:'#f0f8ff', antiquewhite:'#faebd7', aqua:'#00ffff',
        aquamarine:'#7fffd4', azure:'#f0ffff', beige:'#f5f5dc',
        bisque:'#ffe4c4', black:'#000000', blanchedalmond:'#ffebcd',
        blue:'#0000ff', blueviolet:'#8a2be2', brown:'#a52a2a',
        burlywood:'#deb887', cadetblue:'#5f9ea0', chartreuse:'#7fff00',
        chocolate:'#d2691e', coral:'#ff7f50', cornflowerblue:'#6495ed',
        cornsilk:'#fff8dc', crimson:'#dc143c', cyan:'#00ffff',
        darkblue:'#00008b', darkcyan:'#008b8b', darkgoldenrod:'#b8860b',
        darkgray:'#a9a9a9', darkgreen:'#006400', darkkhaki:'#bdb76b',
        darkmagenta:'#8b008b', darkolivegreen:'#556b2f', darkorange:'#ff8c00',
        darkorchid:'#9932cc', darkred:'#8b0000', darksalmon:'#e9967a',
        darkseagreen:'#8fbc8f', darkslateblue:'#483d8b', darkslategray:'#2f4f4f',
        darkturquoise:'#00ced1', darkviolet:'#9400d3', deeppink:'#ff1493',
        deepskyblue:'#00bfff', dimgray:'#696969', dodgerblue:'#1e90ff',
        firebrick:'#b22222', floralwhite:'#fffaf0',
        forestgreen:'#228b22', fuchsia:'#ff00ff', gainsboro:'#dcdcdc',
        ghostwhite:'#f8f8ff', gold:'#ffd700', goldenrod:'#daa520', gray:'#808080',
        green:'#008000', greenyellow:'#adff2f', honeydew:'#f0fff0',
        hotpink:'#ff69b4', indianred:'#cd5c5c', indigo:'#4b0082',
        ivory:'#fffff0', khaki:'#f0e68c', lavender:'#e6e6fa',
        lavenderblush:'#fff0f5', lawngreen:'#7cfc00', lemonchiffon:'#fffacd',
        lightblue:'#add8e6', lightcoral:'#f08080', lightcyan:'#e0ffff',
        lightgoldenrodyellow:'#fafad2', lightgray:'#d3d3d3', lightgreen:'#90ee90',
        lightpink:'#ffb6c1', lightsalmon:'#ffa07a', lightseagreen:'#20b2aa',
        lightskyblue:'#87cefa', lightslategray:'#778899', lightsteelblue:'#b0c4de',
        lightyellow:'#ffffe0', lime:'#00ff00', limegreen:'#32cd32', linen:'#faf0e6',
        magenta:'#ff00ff', maroon:'#800000', mediumaquamarine:'#66cdaa',
        mediumblue:'#0000cd', mediumorchid:'#ba55d3', mediumpurple:'#9370db',
        mediumseagreen:'#3cb371', mediumslateblue:'#7b68ee',
        mediumspringgreen:'#00fa9a', mediumturquoise:'#48d1cc',
        mediumvioletred:'#c71585', midnightblue:'#191970', mintcream:'#f5fffa',
        mistyrose:'#ffe4e1', moccasin:'#ffe4b5', navajowhite:'#ffdead',
        navy:'#000080', oldlace:'#fdf5e6', olive:'#808000', olivedrab:'#6b8e23',
        orange:'#ffa500', orangered:'#ff4500', orchid:'#da70d6',
        alegoldenrod:'#eee8aa', palegreen:'#98fb98', paleturquoise:'#afeeee',
        palevioletred:'#db7093', papayawhip:'#ffefd5', peachpuff:'#ffdab9',
        peru:'#cd853f', pink:'#ffc0cb', plum:'#dda0dd', powderblue:'#b0e0e6',
        purple:'#800080', red:'#ff0000', rosybrown:'#bc8f8f', royalblue:'#4169e1',
        saddlebrown:'#8b4513', salmon:'#fa8072', sandybrown:'#f4a460',
        seagreen:'#2e8b57', seashell:'#fff5ee', sienna:'#a0522d',
        silver:'#c0c0c0', skyblue:'#87ceeb', slateblue:'#6a5acd',
        slategray:'#708090', snow:'#fffafa', springgreen:'#00ff7f',
        steelblue:'#4682b4', tan:'#d2b48c', teal:'#008080', thistle:'#d8bfd8',
        tomato:'#ff6347', turquoise:'#40e0d0', violet:'#ee82ee', wheat:'#f5deb3',
        white:'#ffffff', whitesmoke:'#f5f5f5', yellow:'#ffff00', yellowgreen:'#9acd32'
    }
    if (/^[a-z]+$/.test(c)){
        c= colornames[c];
    }
    if(/^#([a-f0-9]{3}){1,2}$/.test(c)){
        if(c.length== 4){
            c= '#'+[c[1], c[1], c[2], c[2], c[3], c[3]].join('');
        }
        c= '0x'+c.substring(1);
        return [(c>>16)&255, (c>>8)&255, c&255];
    }
    if(c.indexOf('hsl')== 0) return hslToRgb(c);
    else{
        c= c.match(/\d+(\.\d+)?%?/g);
        if(c){
            for(var i= 0;i<3;i++){
                if(c[i].indexOf('%')!= -1) c[i]= parseFloat(c[i])*2.55;
                c[i]= Math.round(c[i]);
                if(c[i]<0) c[i]= 0;
                if(c[i]>255) c[i]= 255;
            }
            return c;
        }
    }
function hslToRgb(hsl){
    if(typeof hsl== 'string'){
        hsl= hsl.match(/(\d+(\.\d+)?)/g);
    }
    var sub, h= hsl[0]/360, s= hsl[1]/100, l= hsl[2]/100,
    t1, t2, t3, rgb, val;
    if(s== 0){
        val= Math.round(l*255);
        rgb= [val, val, val];
    }
    else{
        if(l<0.5)   t2= l*(1 + s);
        else t2= l + s - l*s;
        t1= 2*l - t2;
        rgb= [0, 0, 0];
        for(var i= 0;i<3;i++){
            t3= h + 1/3*-(i - 1);
            t3<0 && t3++;
            t3>1 && t3--;
            if(6*t3<1) val= t1 +(t2 - t1)*6*t3;
            else if(2*t3<1) val= t2;
            else if(3*t3<2) val= t1 +(t2 - t1)*(2/3 - t3)*6;
            else val= t1;
            rgb[i]= Math.round(val*255);
        }
    }
    return rgb;
    }
}

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function rgbToHex(rgb) {
    return "#"+rgb[0].toString(16)+rgb[1].toString(16)+rgb[2].toString(16);
}

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

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
        "type":"stackexchange",
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
        "type":"reddit",
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
                                postBody.style.color = "#444"
        
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

function getPreviewGenerator(url) {
    let match = integrations.find((integration) => integration.match(url))
    return [match && match.name, match && (
        async () => {

            let rootContainer = document.createElement("div")
            let shadowRoot = rootContainer.attachShadow({ "mode": "open" })

            let root = document.createElement("div")
            root.style.visibility = "hidden";
            root.style.opacity = "0";
            root.classList.add('preview-container')

            root.new(`link[type="text/css"][rel="stylesheet"]`).href = chrome.runtime.getURL("public/css/github.css");
            root.new(`link[type="text/css"][rel="stylesheet"]`).href = chrome.runtime.getURL("public/css/highlightjs-copy.css");
            root.new(`link[type="text/css"][rel="stylesheet"]`).href = chrome.runtime.getURL("public/css/preview.css");

            shadowRoot.appendChild(root)

            await match.preview(url, root)

            root.querySelectorAll('pre code').forEach((el) => {
                hljs.highlightElement(el);
            });

            return rootContainer
        }
    )]
}
