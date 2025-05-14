const serverUrls = {
  'server1': "https://server1-project502.onrender.com",
  'server2': "https://server2-project502.onrender.com",
  'server3': "https://server3-project502.onrender.com"
};
const encodedKeysByDay = {
  0x0: "S0VZX0JFVExPRw==",
  0x1: "S0VZX01BS0FOVE9USU4=",
  0x2: "S0VZX1RBTkdB",
  0x3: "S0VZX0tVUEFM",
  0x4: "S0VZX1VMT0w=",
  0x5: "S0VZX0JVR09L",
  0x6: "S0VZX05JR0dFUg=="
};
function decodeBase64(_0x4e5078) {
  try {
    return atob(_0x4e5078);
  } catch {
    return '';
  }
}
function getTodayPremiumKey() {
  const _0x13df74 = new Date().getDay();
  return decodeBase64(encodedKeysByDay[_0x13df74]);
}
function isPremiumUser() {
  const _0x121b81 = document.getElementById('premium-key').value.trim();
  return _0x121b81 === getTodayPremiumKey();
}
function isPremiumActivated() {
  return localStorage.getItem("isPremiumActivated") === "true";
}
function setCooldown(_0x3eb5bf, _0x1c3f80) {
  const _0x2a4fa9 = Date.now() + _0x1c3f80 * 0x3c * 0x3e8;
  localStorage.setItem("cooldown_" + _0x3eb5bf, _0x2a4fa9);
  updateServerText(_0x3eb5bf);
}
function getCooldownRemaining(_0x5e9786) {
  const _0x3fdfd5 = parseInt(localStorage.getItem("cooldown_" + _0x5e9786) || '0');
  return _0x3fdfd5 - Date.now();
}
function isCooldownActive(_0x29f7a5) {
  return !(localStorage.getItem("isPremiumActivated") === "true") && getCooldownRemaining(_0x29f7a5) > 0x0;
}
function updateServerText(_0x20d6d6) {
  const _0x1c2235 = document.querySelector("#server option[value=\"" + _0x20d6d6 + "\"]");
  const _0x583c9b = _0x1c2235.textContent.split(" (")[0x0];
  const _0x42336d = getCooldownRemaining(_0x20d6d6);
  if (!(localStorage.getItem("isPremiumActivated") === "true")) {
    _0x1c2235.disabled = true;
    if (_0x42336d > 0x0) {
      const _0x4a7452 = Math.floor(_0x42336d / 0xea60);
      const _0x486c4e = Math.floor(_0x42336d % 0xea60 / 0x3e8);
      _0x1c2235.textContent = _0x583c9b + " (cooldown " + _0x4a7452 + ':' + _0x486c4e.toString().padStart(0x2, '0') + ')';
    } else {
      _0x1c2235.textContent = _0x583c9b + " (locked)";
    }
  } else {
    _0x1c2235.disabled = false;
    _0x1c2235.textContent = _0x583c9b + " (active)";
    localStorage.removeItem("cooldown_" + _0x20d6d6);
  }
}
function refreshCooldownUI() {
  ["server1", "server2", "server3"].forEach(updateServerText);
}
setInterval(refreshCooldownUI, 0x3e8);
async function checkServerStatus() {
  const _0x3f3bd7 = document.querySelectorAll("#server option");
  let _0x5be5cb = true;
  const _0x22f011 = document.getElementById("submit-button");
  for (const _0x457841 of _0x3f3bd7) {
    const _0x5bd4e6 = _0x457841.value;
    try {
      const _0x505fd8 = await fetch(serverUrls[_0x5bd4e6]);
      if (_0x505fd8.ok && !(!(localStorage.getItem("isPremiumActivated") === "true") && getCooldownRemaining(_0x5bd4e6) > 0x0)) {
        _0x457841.textContent = _0x457841.textContent.split(" (")[0x0] + " (active)";
        _0x457841.disabled = !(localStorage.getItem("isPremiumActivated") === 'true');
        _0x5be5cb = false;
      } else if (!(!(localStorage.getItem("isPremiumActivated") === "true") && getCooldownRemaining(_0x5bd4e6) > 0x0)) {
        _0x457841.textContent = _0x457841.textContent.split(" (")[0x0] + " (down)";
        _0x457841.disabled = true;
      }
    } catch {
      _0x457841.textContent = _0x457841.textContent.split(" (")[0x0] + " (down)";
      _0x457841.disabled = true;
    }
  }
  _0x22f011.disabled = _0x5be5cb;
}
document.getElementById("share-boost-form").onsubmit = async function (_0x22d7a2) {
  _0x22d7a2.preventDefault();
  const _0x2aab24 = document.getElementById("responseModal");
  const _0x57e18f = document.getElementById("responseMessage");
  const _0x50c21b = document.getElementById("urls").value;
  const _0x29c110 = parseInt(document.getElementById('amounts').value);
  if (!(localStorage.getItem("isPremiumActivated") === "true") && _0x29c110 > 0x3e8) {
    alert("Free users can only enter an amount up to 1000. Please upgrade to premium to get unlimited shares");
    return;
  }
  const _0x105118 = document.getElementById("cookies").value;
  const _0x409804 = parseInt(document.getElementById("intervals").value);
  const _0x1c34b0 = document.getElementById('server').value;
  if (!(localStorage.getItem("isPremiumActivated") === 'true') && getCooldownRemaining(_0x1c34b0) > 0x0) {
    alert("This server is on cooldown. Please wait before using it again.");
    return;
  }
  _0x57e18f.textContent = "Processing your request, please wait...";
  _0x2aab24.style.display = 'flex';
  try {
    const _0x2bf398 = serverUrls[_0x1c34b0];
    const _0x2e3b67 = await fetch(_0x2bf398 + "/api/submit", {
      'method': "POST",
      'body': JSON.stringify({
        'cookie': _0x105118,
        'url': _0x50c21b,
        'amount': _0x29c110,
        'interval': _0x409804
      }),
      'headers': {
        'Content-Type': "application/json"
      }
    });
    const _0xb72d0b = await _0x2e3b67.json();
    if (_0xb72d0b.status === 0xc8) {
      _0x57e18f.textContent = "Your request was submitted successfully!";
      if (!(localStorage.getItem("isPremiumActivated") === 'true')) {
        setCooldown(_0x1c34b0, 0x5a);
      }
    } else {
      _0x57e18f.textContent = "Error: " + _0xb72d0b.message;
    }
  } catch {
    _0x57e18f.textContent = "Network error, please try again.";
  } finally {
    setTimeout(() => _0x2aab24.style.display = "none", 0xbb8);
  }
};
function updateDateTime() {
  const _0x55956c = document.getElementById('date-time');
  const _0x3ff252 = new Date();
  const _0x543236 = {
    'timeZone': "Asia/Manila",
    'hour12': true
  };
  _0x55956c.textContent = "Date/Time : " + _0x3ff252.toLocaleString("en-US", _0x543236);
}
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const _0xff810a = document.getElementById("mode-switch");
  _0xff810a.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}
document.getElementById("mode-switch").addEventListener("click", toggleDarkMode);
async function fetchCatFact() {
  const _0x3cae42 = document.getElementById('catfact-text');
  _0x3cae42.textContent = "Fetching cat fact...";
  try {
    const _0xfe0671 = await fetch("https://catfact.ninja/fact");
    const _0x4cb7a9 = await _0xfe0671.json();
    _0x3cae42.textContent = _0x4cb7a9.fact || "Could not fetch a cat fact.";
  } catch {
    _0x3cae42.textContent = "An error occurred. Please try again.";
  }
}
document.getElementById("fetch-catfact-button").addEventListener("click", fetchCatFact);
function updateInfoMessage() {
  const _0x387609 = document.getElementById("info-message");
  if (localStorage.getItem("isPremiumActivated") === 'true') {
    _0x387609.textContent = "STATUS : Premium User";
    _0x387609.style.color = "blue";
  } else {
    _0x387609.textContent = "STATUS : Free User";
    _0x387609.style.color = "green";
  }
}
window.onload = () => {
  checkServerStatus();
  updateDateTime();
  fetchCatFact();
  refreshCooldownUI();
  const _0x37c176 = document.getElementById("premium-key");
  const _0x10fbb9 = localStorage.getItem('premiumKey') || '';
  _0x37c176.value = _0x10fbb9;
  _0x37c176.addEventListener("input", () => {
    localStorage.setItem('premiumKey', _0x37c176.value.trim());
  });
  updateInfoMessage();
  if (!(localStorage.getItem("isPremiumActivated") === "true")) {
    const _0x391065 = document.querySelectorAll("#server option");
    _0x391065.forEach(_0x3f6010 => {
      _0x3f6010.disabled = true;
      _0x3f6010.textContent = _0x3f6010.textContent.split(" (")[0x0] + " (locked)";
    });
  }
};
function activatePremium() {
  if (!isPremiumUser()) {
    alert("Invalid premium key.");
    return;
  }
  localStorage.setItem('isPremiumActivated', 'true');
  ["server1", "server2", 'server3'].forEach(_0x243e78 => {
    localStorage.removeItem("cooldown_" + _0x243e78);
    const _0x34686b = document.querySelector("#server option[value=\"" + _0x243e78 + "\"]");
    _0x34686b.disabled = false;
    _0x34686b.textContent = _0x34686b.textContent.split(" (")[0x0] + " (active)";
  });
  updateInfoMessage();
  alert("Premium activated! Cooldowns removed and servers unlocked.");
        }
