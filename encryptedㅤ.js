document.addEventListener("DOMContentLoaded", function () {
  const script = document.createElement("script");
  script.src = "https://sharebooster.neocities.org/scripts%E3%85%A4.js"; // Your external JS file
  script.type = "text/javascript";
  script.async = true;

  const statusDiv = document.getElementById("script-status");

  script.onload = function () {
    statusDiv.textContent = "Server Online: Si Bogart ay gising";
    statusDiv.style.display = "block";
    statusDiv.style.color = "green";
  };

  script.onerror = function () {
    statusDiv.textContent = "Server Offline: Si Bogart ay tulog";
    statusDiv.style.display = "block";
    statusDiv.style.color = "red";
  };

  document.head.appendChild(script);
});
