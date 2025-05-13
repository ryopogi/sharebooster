if (!document.getElementById('myScript')) {
  const script = document.createElement('script');
  script.src = 'script2.js';
  script.id = 'myScript';
  document.head.appendChild(script);
}
