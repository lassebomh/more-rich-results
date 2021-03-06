
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

async function sendBgMessage(obj) {
    return await (new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(obj, (response) => {
            resolve(response);
        });
    }));
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