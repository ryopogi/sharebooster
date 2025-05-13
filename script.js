// script.js
console.log("Loading additional components...");

const realScript = document.createElement('script');
realScript.src = 'script2.js';  // real logic
document.head.appendChild(realScript);
