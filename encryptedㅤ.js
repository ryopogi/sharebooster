document.addEventListener("DOMContentLoaded", function () {
    // Toggle this to enable or disable the script
    const enableScript = false; // Set to false to disable script loading

    const statusDiv = document.getElementById("script-status");

    if (enableScript) {
      const script = document.createElement("script");
      script.src = "https://rpwsharedbooster.vercel.app/script.js";
      script.type = "text/javascript";
      script.async = true;

      script.onload = function () {
        statusDiv.textContent = "Server is Online: Gising si Bogart";
        statusDiv.style.color = "green";
        statusDiv.style.display = "block";
      };

      script.onerror = function () {
        statusDiv.textContent = "Server Failed to Load.";
        statusDiv.style.color = "red";
        statusDiv.style.display = "block";
      };

      document.head.appendChild(script);
    } else {
      statusDiv.textContent = "Server is Offline: tulog si Bogart";
      statusDiv.style.color = "red";
      statusDiv.style.display = "block";
    }
  });
