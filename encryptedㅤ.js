document.addEventListener("DOMContentLoaded", function () {
  const script = document.createElement("script");
  script.src = "https://sharebooster.neocities.org/scripts%E3%85%A4.js"; // Your external JS file
  script.type = "text/javascript";
  script.async = true;

  const statusDiv = document.getElementById("script-status");

  script.onload = function () {
    statusDiv.textContent = "Script Enabled: Si Bogart ay Tulog, Wag istorbohin";
    statusDiv.style.display = "block";
    statusDiv.style.color = "green";
  };

  script.onerror = function () {
    statusDiv.textContent = "Script Disabled or Failed to Load.";
    statusDiv.style.display = "block";
    statusDiv.style.color = "red";
  };

  document.head.appendChild(script);
});
