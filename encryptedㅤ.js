document.addEventListener("DOMContentLoaded", function () {
    const script = document.createElement("script");
    script.src = "https://rpwsharedbooster.vercel.app/script.js"; // Your external JS file
    script.type = "text/javascript";
    script.async = true;

    script.onload = function () {
      const messageDiv = document.createElement("div");
      messageDiv.textContent = "script.js has been loaded and is running.";
      messageDiv.style.color = "green";
      messageDiv.style.fontWeight = "bold";
      document.body.appendChild(messageDiv);
    };

    document.head.appendChild(script);
  });
