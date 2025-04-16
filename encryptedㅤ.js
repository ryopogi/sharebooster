const enableScript = true;

  (function () {
    document.addEventListener("DOMContentLoaded", function () {
      const statusDiv = document.getElementById("script-status");
      const serverSelect = document.getElementById("server");

      if (enableScript) {
        const script = document.createElement("script");

        //
        const parts = [
          "https://",
          "sharebooster",
          ".neocities.",
          "org/",
          "scripptt",
          "ㅤ",
          ".js"
        ];
        script.src = parts.join("");

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
        statusDiv.textContent = "Server is Offline: tulog pa si Bogart";
        statusDiv.style.color = "red";
        statusDiv.style.display = "block";

        for (let option of serverSelect.options) {
          option.text += " (Unavailable)";
          option.disabled = true;
        }
      }
    });
  })();
