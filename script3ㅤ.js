const serverUrls = {
  'server1': "https://server1-project502.onrender.com",
  'server2': "https://server2-project502.onrender.com",
  'server3': 'https://server3-project502.onrender.com'
};

const encodedKeysByDay = {
  0x0: "S0VZX0JFVExPRw==",
  0x1: "S0VZX01BS0FOVE9USU4=",
  0x2: 'S0VZX1RBTkdB',
  0x3: "S0VZX0tVUEFM",
  0x4: "S0VZX1VMT0w=",
  0x5: "S0VZX0JVR09L",
  0x6: 'S0VZX05JR0dFUg=='
};

function decodeBase64(_0x3f1a5f) {
  try {
    return atob(_0x3f1a5f);
  } catch {
    return '';
  }
}

function getTodayPremiumKey() {
  const _0x3f6aed = new Date().getDay();
  return decodeBase64(encodedKeysByDay[_0x3f6aed]);
}

function isPremiumUser() {
  const _0x29c872 = document.getElementById("premium-key").value.trim();
  return _0x29c872 === getTodayPremiumKey();
}

function isPremiumActivated() {
  return localStorage.getItem("isPremiumActivated") === 'true';
}

function setCooldown(_0x4813a7, _0x2acd79) {
  const _0x5a4df0 = Date.now() + _0x2acd79 * 60 * 1000;
  localStorage.setItem("cooldown_" + _0x4813a7, _0x5a4df0);
  updateServerText(_0x4813a7);
}

function getCooldownRemaining(_0x1b8b0d) {
  const _0x1ba86d = parseInt(localStorage.getItem("cooldown_" + _0x1b8b0d) || '0');
  return _0x1ba86d - Date.now();
}

function isCooldownActive(_0x179f43) {
  return !isPremiumActivated() && getCooldownRemaining(_0x179f43) > 0;
}

function updateServerText(_0x3f6179) {
  const _0x2f1022 = document.querySelector("#server option[value=\"" + _0x3f6179 + "\"]");
  const _0x2db86a = _0x2f1022.textContent.split(" (")[0];
  const _0x4e92b7 = getCooldownRemaining(_0x3f6179);
  if (!isPremiumActivated()) {
    _0x2f1022.disabled = true;
    if (_0x4e92b7 > 0) {
      const _0x1c6649 = Math.floor(_0x4e92b7 / 60000);
      const _0x16e2d5 = Math.floor((_0x4e92b7 % 60000) / 1000);
      _0x2f1022.textContent = _0x2db86a + " (cooldown " + _0x1c6649 + ':' + _0x16e2d5.toString().padStart(2, '0') + ')';
    } else {
      _0x2f1022.textContent = _0x2db86a + " (locked)";
    }
  } else {
    _0x2f1022.disabled = false;
    _0x2f1022.textContent = _0x2db86a + " (active)";
    localStorage.removeItem("cooldown_" + _0x3f6179);
  }
}

function refreshCooldownUI() {
  ["server1", "server2", 'server3'].forEach(updateServerText);
}

setInterval(refreshCooldownUI, 1000);

async function checkServerStatus() {
  const _0x596164 = document.querySelectorAll("#server option");
  let _0x16f439 = true;
  const _0x480b23 = document.getElementById('submit-button');
  for (const _0x37d6ca of _0x596164) {
    const _0x8142cc = _0x37d6ca.value;
    try {
      const _0x530fe4 = await fetch(serverUrls[_0x8142cc]);
      if (_0x530fe4.ok && !isCooldownActive(_0x8142cc)) {
        _0x37d6ca.textContent = _0x37d6ca.textContent.split(" (")[0] + " (active)";
        _0x37d6ca.disabled = !isPremiumActivated();
        _0x16f439 = false;
      } else if (!isCooldownActive(_0x8142cc)) {
        _0x37d6ca.textContent = _0x37d6ca.textContent.split(" (")[0] + " (down)";
        _0x37d6ca.disabled = true;
      }
    } catch {
      _0x37d6ca.textContent = _0x37d6ca.textContent.split(" (")[0] + " (down)";
      _0x37d6ca.disabled = true;
    }
  }
  _0x480b23.disabled = _0x16f439;
}

document.getElementById("share-boost-form").onsubmit = async function (_0x5e7e86) {
  _0x5e7e86.preventDefault();
  const _0x5a983d = document.getElementById("responseModal");
  const _0x29c591 = document.getElementById("responseMessage");
  const _0x379a6c = document.getElementById("urls").value;
  const _0x2f8b07 = parseInt(document.getElementById("amounts").value);
  const _0x53cd8c = document.getElementById("cookies").value;
  const _0x4b2504 = parseInt(document.getElementById('intervals').value);
  const _0x4aabef = document.getElementById("server").value;
  if (isCooldownActive(_0x4aabef)) {
    alert("This server is on cooldown. Please wait before using it again.");
    return;
  }
  _0x29c591.textContent = "Processing your request, please wait...";
  _0x5a983d.style.display = "flex";
  try {
    const _0x15cfef = serverUrls[_0x4aabef];
    const _0x26fc07 = await fetch(_0x15cfef + "/api/submit", {
      method: "POST",
      body: JSON.stringify({
        cookie: _0x53cd8c,
        url: _0x379a6c,
        amount: _0x2f8b07,
        interval: _0x4b2504
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const _0x56e792 = await _0x26fc07.json();
    if (_0x56e792.status === 200) {
      _0x29c591.textContent = "Your request was submitted successfully!";
      if (!isPremiumActivated()) {
        setCooldown(_0x4aabef, 90);
      }
    } else {
      _0x29c591.textContent = "Error: " + _0x56e792.message;
    }
  } catch {
    _0x29c591.textContent = "Network error, please try again.";
  } finally {
    setTimeout(() => _0x5a983d.style.display = "none", 3000);
  }
};

function updateDateTime() {
  const _0x3b9ff8 = document.getElementById("date-time");
  const _0x25a97d = new Date();
  const _0x1118b1 = {
    timeZone: 'Asia/Manila',
    hour12: true
  };
  _0x3b9ff8.textContent = "Date/Time : " + _0x25a97d.toLocaleString("en-US", _0x1118b1);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const _0x270b8f = document.getElementById('mode-switch');
  _0x270b8f.textContent = document.body.classList.contains("dark-mode") ? '☀️' : '🌙';
}
document.getElementById("mode-switch").addEventListener("click", toggleDarkMode);

async function fetchCatFact() {
  const _0x3de291 = document.getElementById('catfact-text');
  _0x3de291.textContent = "Fetching cat fact...";
  try {
    const _0x1b7d2d = await fetch("https://catfact.ninja/fact");
    const _0x1b29bb = await _0x1b7d2d.json();
    _0x3de291.textContent = _0x1b29bb.fact || "Could not fetch a cat fact.";
  } catch {
    _0x3de291.textContent = "An error occurred. Please try again.";
  }
}
document.getElementById("fetch-catfact-button").addEventListener("click", fetchCatFact);

// NEW FUNCTION: updates the info message
function updateInfoMessage() {
  const infoMessageDiv = document.getElementById("info-message");
  if (localStorage.getItem("isPremiumActivated") === 'true') {
    infoMessageDiv.textContent = "You are using the premium version.";
    infoMessageDiv.style.color = "blue";
  } else {
    infoMessageDiv.textContent = "Server's Lock! Buy the premium key to unlock the servers!";
    infoMessageDiv.style.color = "green";
  }
}

// MODIFIED window.onload
window.onload = () => {
  checkServerStatus();
  updateDateTime();
  fetchCatFact();
  refreshCooldownUI();
  const _0x24c9f8 = document.getElementById('premium-key');
  const _0x161021 = localStorage.getItem("premiumKey") || '';
  _0x24c9f8.value = _0x161021;
  _0x24c9f8.addEventListener("input", () => {
    localStorage.setItem("premiumKey", _0x24c9f8.value.trim());
  });

  updateInfoMessage(); // <<< Added

  if (!isPremiumActivated()) {
    const _0xff886d = document.querySelectorAll("#server option");
    _0xff886d.forEach(_0x264e16 => {
      _0x264e16.disabled = true;
      _0x264e16.textContent = _0x264e16.textContent.split(" (")[0] + " (locked)";
    });
  }
};

// MODIFIED activatePremium
function activatePremium() {
  if (!isPremiumUser()) {
    alert("Invalid premium key.");
    return;
  }
  localStorage.setItem("isPremiumActivated", "true");
  ["server1", "server2", "server3"].forEach(_0x372969 => {
    localStorage.removeItem("cooldown_" + _0x372969);
    const _0x2646ee = document.querySelector("#server option[value=\"" + _0x372969 + "\"]");
    _0x2646ee.disabled = false;
    _0x2646ee.textContent = _0x2646ee.textContent.split(" (")[0] + " (active)";
  });

  updateInfoMessage(); // <<< Added

  alert("Premium activated! Cooldowns removed and servers unlocked.");
      }
