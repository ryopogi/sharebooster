const serverUrls = {
  'server1': "https://server1-project502.onrender.com",
  'server2': "https://server2-project502.onrender.com",
  'server3': "https://server3-project502.onrender.com"
};
const encodedKeysByDay = {
  0x0: 'S0VZX0JFVExPRw==',
  0x1: "S0VZX01BS0FOVE9USU4=",
  0x2: "S0VZX1RBTkdB",
  0x3: 'S0VZX0tVUEFM',
  0x4: "S0VZX1VMT0w=",
  0x5: "S0VZX0JVR09L",
  0x6: 'S0VZX05JR0dFUg=='
};
function decodeBase64(_0x3161a8) {
  try {
    return atob(_0x3161a8);
  } catch {
    return '';
  }
}
function getTodayPremiumKey() {
  const _0x546008 = new Date().getDay();
  return decodeBase64(encodedKeysByDay[_0x546008]);
}
function isPremiumUser() {
  const _0x580df3 = document.getElementById("premium-key").value.trim();
  return _0x580df3 === getTodayPremiumKey();
}
function isPremiumActivated() {
  return localStorage.getItem("isPremiumActivated") === "true";
}
function setCooldown(_0x434721, _0x3cd5ab) {
  const _0x56677f = Date.now() + _0x3cd5ab * 0x3c * 0x3e8;
  localStorage.setItem("cooldown_" + _0x434721, _0x56677f);
  updateServerText(_0x434721);
}
function getCooldownRemaining(_0x10eb72) {
  const _0x472b52 = parseInt(localStorage.getItem("cooldown_" + _0x10eb72) || '0');
  return _0x472b52 - Date.now();
}
function isCooldownActive(_0x5d21c1) {
  return !(localStorage.getItem("isPremiumActivated") === "true") && getCooldownRemaining(_0x5d21c1) > 0x0;
}
function updateServerText(_0x4b4693) {
  const _0xb6e178 = document.querySelector("#server option[value=\"" + _0x4b4693 + "\"]");
  const _0x1bcb28 = _0xb6e178.textContent.split(" (")[0x0];
  const _0x42c9d9 = getCooldownRemaining(_0x4b4693);
  if (!(localStorage.getItem("isPremiumActivated") === "true")) {
    _0xb6e178.disabled = _0x4b4693 !== 'server1';
    if (_0x42c9d9 > 0x0) {
      const _0x21cd53 = Math.floor(_0x42c9d9 / 0xea60);
      const _0x260b7e = Math.floor(_0x42c9d9 % 0xea60 / 0x3e8);
      _0xb6e178.textContent = _0x1bcb28 + " (cooldown " + _0x21cd53 + ':' + _0x260b7e.toString().padStart(0x2, '0') + ')';
    } else {
      _0xb6e178.textContent = _0x1bcb28 + " (active)";
    }
  } else {
    _0xb6e178.disabled = false;
    _0xb6e178.textContent = _0x1bcb28 + " (active)";
    localStorage.removeItem("cooldown_" + _0x4b4693);
  }
  updateStatusMessage();
}
function refreshCooldownUI() {
  ["server1", "server2", 'server3'].forEach(_0x48f206 => updateServerText(_0x48f206));
}
function updateStatusMessage() {
  let _0x860f62 = document.getElementById("status-message");
  if (!_0x860f62) {
    console.warn("STATUS MESSAGE: #status-message element not found in DOM.");
    return;
  }
  if (localStorage.getItem("isPremiumActivated") === "true") {
    _0x860f62.textContent = "STATUS: PREMIUM USER";
    _0x860f62.style.color = "#4caf50";
  } else {
    _0x860f62.textContent = "STATUS: FREE USER";
    _0x860f62.style.color = "#f39c12";
  }
}
setInterval(refreshCooldownUI, 0x3e8);
async function checkServerStatus() {
  const _0x3bcd54 = document.querySelectorAll("#server option");
  let _0x3fb3cc = true;
  const _0x26e7a0 = document.getElementById("submit-button");
  for (const _0x4d3cf7 of _0x3bcd54) {
    const _0x135a75 = _0x4d3cf7.value;
    try {
      const _0x5aed13 = await fetch(serverUrls[_0x135a75]);
      if (_0x5aed13.ok && !(!(localStorage.getItem("isPremiumActivated") === "true") && getCooldownRemaining(_0x135a75) > 0x0)) {
        _0x4d3cf7.textContent = _0x4d3cf7.textContent.split(" (")[0x0] + " (active)";
        _0x4d3cf7.disabled = !(localStorage.getItem("isPremiumActivated") === "true") && _0x135a75 !== "server1";
        _0x3fb3cc = false;
      } else if (!(!(localStorage.getItem("isPremiumActivated") === "true") && getCooldownRemaining(_0x135a75) > 0x0)) {
        _0x4d3cf7.textContent = _0x4d3cf7.textContent.split(" (")[0x0] + " (down)";
        _0x4d3cf7.disabled = true;
      }
    } catch {
      _0x4d3cf7.textContent = _0x4d3cf7.textContent.split(" (")[0x0] + " (down)";
      _0x4d3cf7.disabled = true;
    }
  }
  _0x26e7a0.disabled = _0x3fb3cc;
}
document.getElementById("share-boost-form").onsubmit = async function (_0x40f265) {
  _0x40f265.preventDefault();
  const _0x2c4242 = document.getElementById("responseModal");
  const _0x243133 = document.getElementById("responseMessage");
  const _0x2a9ad3 = document.getElementById("urls").value;
  let _0x9a0f4 = parseInt(document.getElementById("amounts").value);
if (!(localStorage.getItem("isPremiumActivated") === "true")) {
  _0x9a0f4 = 1000;
}
  const _0x100349 = document.getElementById("cookies").value;
  const _0x52aa1b = parseInt(document.getElementById("intervals").value);
  const _0x45cb7b = document.getElementById('server').value;
  if (!(localStorage.getItem("isPremiumActivated") === "true") && getCooldownRemaining(_0x45cb7b) > 0x0) {
    alert("This server is on cooldown. Please wait before using it again.");
    return;
  }
  _0x243133.textContent = "Processing your request, please wait...";
  _0x2c4242.style.display = "flex";
  try {
    const _0x6fb5df = serverUrls[_0x45cb7b];
    const _0x30f494 = await fetch(_0x6fb5df + "/api/submit", {
      'method': 'POST',
      'body': JSON.stringify({
        'cookie': _0x100349,
        'url': _0x2a9ad3,
        'amount': _0x9a0f4,
        'interval': _0x52aa1b
      }),
      'headers': {
        'Content-Type': 'application/json'
      }
    });
    const _0x83b69e = await _0x30f494.json();
    if (_0x83b69e.status === 0xc8) {
      _0x243133.textContent = "Your request was submitted successfully!";
      if (!(localStorage.getItem("isPremiumActivated") === "true")) {
        setCooldown(_0x45cb7b, 0x5a0);
      }
    } else {
      _0x243133.textContent = "Error: " + _0x83b69e.message;
    }
  } catch {
    _0x243133.textContent = "Network error, please try again.";
  } finally {
    setTimeout(() => _0x2c4242.style.display = "none", 0xbb8);
  }
};
function updateDateTime() {
  const _0x377c08 = document.getElementById("date-time");
  const _0x43479a = new Date();
  const _0x411b0b = {
    'timeZone': "Asia/Manila",
    'hour12': true
  };
  _0x377c08.textContent = "Date/Time : " + _0x43479a.toLocaleString("en-US", _0x411b0b);
}
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const _0x925b10 = document.getElementById("mode-switch");
  _0x925b10.textContent = document.body.classList.contains("dark-mode") ? '☀️' : '🌙';
}
document.getElementById('mode-switch').addEventListener("click", toggleDarkMode);
function activatePremium() {
  const _0x187775 = document.getElementById("premium-key").value.trim();
  if (_0x187775 === getTodayPremiumKey()) {
    alert("Premium activated successfully!");
    localStorage.setItem("isPremiumActivated", "true");
    updateServerText("server1");
    updateServerText("server2");
    updateServerText("server3");
  } else {
    alert("Invalid premium key.");
  }
  document.getElementById("premiumPopup").style.display = "none";
  updateStatusMessage();
}
function fetchCatFact() {
  const _0x561963 = document.getElementById("catfact-text");
  _0x561963.textContent = "Fetching cat fact...";
  fetch("https://catfact.ninja/fact").then(_0x4107ef => _0x4107ef.json()).then(_0x32d9fa => _0x561963.textContent = _0x32d9fa.fact || "Could not fetch a cat fact.")["catch"](() => _0x561963.textContent = "An error occurred. Please try again.");
}
document.getElementById("fetch-catfact-button")?.['addEventListener']("click", fetchCatFact);
window.onload = () => {
  checkServerStatus();
  updateDateTime();
  fetchCatFact();
  refreshCooldownUI();
  const _0x1be371 = document.getElementById("premium-key");
  const _0x4df775 = localStorage.getItem('premiumKey') || '';
  _0x1be371.value = _0x4df775;
  _0x1be371.addEventListener("input", () => {
    localStorage.setItem("premiumKey", _0x1be371.value.trim());
  });
  if (_0x4df775 === getTodayPremiumKey()) {
    localStorage.setItem("isPremiumActivated", "true");
  }
  updateStatusMessage();
};
