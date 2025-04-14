document.addEventListener("DOMContentLoaded", function () {
      const script = document.createElement("script");
      script.src = "https://rpwsharedbooster.vercel.app/script.js"; // Your external JS file
      script.type = "text/javascript";
      script.async = true;

      script.onload = function () {
        const statusDiv = document.getElementById("script-status");
        statusDiv.textContent = "Si Bogart ay Tulog, Wag istorbohin";
        statusDiv.style.display = "block";
      };

      document.head.appendChild(script);
    });
