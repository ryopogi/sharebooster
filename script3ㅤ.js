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
function decodeBase64(_0x3e01fd) {
  try {
    return atob(_0x3e01fd);
  } catch {
    return '';
  }
}
function getTodayPremiumKey() {
  const _0x184e32 = new Date().getDay();
  return decodeBase64(encodedKeysByDay[_0x184e32]);
}
function isPremiumUser() {
  const _0x57fe28 = document.getElementById("premium-key").value.trim();
  return _0x57fe28 === getTodayPremiumKey();
}
function isPremiumActivated() {
  return localStorage.getItem("isPremiumActivated") === "true";
}
function setCooldown(_0x7166fb, _0x1a20fa) {
  const _0x269de7 = Date.now() + _0x1a20fa * 0x3c * 0x3e8;
  localStorage.setItem("cooldown_" + _0x7166fb, _0x269de7);
  updateServerText(_0x7166fb);
}
function getCooldownRemaining(_0x50f003) {
  const _0x5f5ae9 = parseInt(localStorage.getItem("cooldown_" + _0x50f003) || '0');
  return _0x5f5ae9 - Date.now();
}
function isCooldownActive(_0xfd7ea5) {
  return !(localStorage.getItem("isPremiumActivated") === "true") && getCooldownRemaining(_0xfd7ea5) > 0x0;
}
function updateServerText(_0xb7233d) {
  const _0x37e1a2 = document.querySelector("#server option[value=\"" + _0xb7233d + "\"]");
  const _0x450efd = _0x37e1a2.textContent.split(" (")[0x0];
  const _0x71aa11 = getCooldownRemaining(_0xb7233d);
  if (!(localStorage.getItem("isPremiumActivated") === "true")) {
    _0x37e1a2.disabled = true;
    if (_0x71aa11 > 0x0) {
      const _0x29289b = Math.floor(_0x71aa11 / 0xea60);
      const _0x50c7eb = Math.floor(_0x71aa11 % 0xea60 / 0x3e8);
      _0x37e1a2.textContent = _0x450efd + " (cooldown " + _0x29289b + ':' + _0x50c7eb.toString().padStart(0x2, '0') + ')';
    } else {
      _0x37e1a2.textContent = _0x450efd + " (locked)";
    }
  } else {
    _0x37e1a2.disabled = false;
    _0x37e1a2.textContent = _0x450efd + " (active)";
    localStorage.removeItem("cooldown_" + _0xb7233d);
  }
}
function refreshCooldownUI() {
  ["server1", "server2", 'server3'].forEach(updateServerText);
}
setInterval(refreshCooldownUI, 0x3e8);
async function checkServerStatus() {
  const _0xdc3d64 = document.querySelectorAll("#server option");
  let _0x58424a = true;
  const _0x14fa16 = document.getElementById('submit-button');
  for (const _0x44f639 of _0xdc3d64) {
    const _0x13c551 = _0x44f639.value;
    try {
      const _0x3b101c = await fetch(serverUrls[_0x13c551]);
      if (_0x3b101c.ok && !(!(localStorage.getItem("isPremiumActivated") === "true") && getCooldownRemaining(_0x13c551) > 0x0)) {
        _0x44f639.textContent = _0x44f639.textContent.split(" (")[0x0] + " (active)";
        _0x44f639.disabled = !(localStorage.getItem("isPremiumActivated") === "true");
        _0x58424a = false;
      } else if (!(!(localStorage.getItem("isPremiumActivated") === "true") && getCooldownRemaining(_0x13c551) > 0x0)) {
        _0x44f639.textContent = _0x44f639.textContent.split(" (")[0x0] + " (down)";
        _0x44f639.disabled = true;
      }
    } catch {
      _0x44f639.textContent = _0x44f639.textContent.split(" (")[0x0] + " (down)";
      _0x44f639.disabled = true;
    }
  }
  _0x14fa16.disabled = _0x58424a;
}
document.getElementById('share-boost-form').onsubmit = async function (_0x3971c5) {
  _0x3971c5.preventDefault();
  const _0x473a85 = document.getElementById("responseModal");
  const _0x21aeeb = document.getElementById('responseMessage');
  const _0x1912ae = document.getElementById("urls").value;
  const _0x1fc1d6 = parseInt(document.getElementById("amounts").value);

  // Enforce free user limit
  if (!isPremiumActivated() && _0x1fc1d6 > 1000) {
    alert("Free users can only enter an amount up to 1000. Please upgrade to premium to get unlimited shares");
    return;
  }

  const _0x283266 = document.getElementById("cookies").value;
  const _0x4464cb = parseInt(document.getElementById("intervals").value);
  const _0x947cd2 = document.getElementById("server").value;

  if (!(localStorage.getItem("isPremiumActivated") === "true") && getCooldownRemaining(_0x947cd2) > 0x0) {
    alert("This server is on cooldown. Please wait before using it again.");
    return;
  }

  _0x21aeeb.textContent = "Processing your request, please wait...";
  _0x473a85.style.display = "flex";

  try {
    const _0x2621ac = serverUrls[_0x947cd2];
    const _0x37a45c = await fetch(_0x2621ac + "/api/submit", {
      'method': 'POST',
      'body': JSON.stringify({
        'cookie': _0x283266,
        'url': _0x1912ae,
        'amount': _0x1fc1d6,
        'interval': _0x4464cb
      }),
      'headers': {
        'Content-Type': "application/json"
      }
    });

    const _0x4cd9c8 = await _0x37a45c.json();
    if (_0x4cd9c8.status === 0xc8) {
      _0x21aeeb.textContent = "Your request was submitted successfully!";
      if (!(localStorage.getItem("isPremiumActivated") === "true")) {
        setCooldown(_0x947cd2, 0x5a);
      }
    } else {
      _0x21aeeb.textContent = "Error: " + _0x4cd9c8.message;
    }
  } catch {
    _0x21aeeb.textContent = "Network error, please try again.";
  } finally {
    setTimeout(() => _0x473a85.style.display = "none", 0xbb8);
  }
};
function updateDateTime() {
  const _0x50fa83 = document.getElementById("date-time");
  const _0x484d87 = new Date();
  const _0x277f16 = {
    'timeZone': "Asia/Manila",
    'hour12': true
  };
  _0x50fa83.textContent = "Date/Time : " + _0x484d87.toLocaleString("en-US", _0x277f16);
}
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const _0x78557d = document.getElementById('mode-switch');
  _0x78557d.textContent = document.body.classList.contains("dark-mode") ? '☀️' : '🌙';
}
document.getElementById("mode-switch").addEventListener("click", toggleDarkMode);
async function fetchCatFact() {
  const _0x25b438 = document.getElementById("catfact-text");
  _0x25b438.textContent = "Fetching cat fact...";
  try {
    const _0x7ffb94 = await fetch('https://catfact.ninja/fact');
    const _0x44f3c4 = await _0x7ffb94.json();
    _0x25b438.textContent = _0x44f3c4.fact || "Could not fetch a cat fact.";
  } catch {
    _0x25b438.textContent = "An error occurred. Please try again.";
  }
}
document.getElementById('fetch-catfact-button').addEventListener("click", fetchCatFact);
function updateInfoMessage() {
  const _0x14ced3 = document.getElementById("info-message");
  if (localStorage.getItem("isPremiumActivated") === 'true') {
    _0x14ced3.textContent = "You are using the premium version.";
    _0x14ced3.style.color = "blue";
  } else {
    _0x14ced3.textContent = "Server's Lock! Buy the premium key to unlock the servers!";
    _0x14ced3.style.color = "green";
  }
}
window.onload = () => {
  checkServerStatus();
  updateDateTime();
  fetchCatFact();
  refreshCooldownUI();
  const _0x1083d5 = document.getElementById("premium-key");
  const _0x49bb81 = localStorage.getItem("premiumKey") || '';
  _0x1083d5.value = _0x49bb81;
  _0x1083d5.addEventListener("input", () => {
    localStorage.setItem("premiumKey", _0x1083d5.value.trim());
  });
  updateInfoMessage();
  if (!(localStorage.getItem("isPremiumActivated") === "true")) {
    const _0x1926c9 = document.querySelectorAll("#server option");
    _0x1926c9.forEach(_0x6b157d => {
      _0x6b157d.disabled = true;
      _0x6b157d.textContent = _0x6b157d.textContent.split(" (")[0x0] + " (locked)";
    });
  }
};
function activatePremium() {
  if (!isPremiumUser()) {
    alert("Invalid premium key.");
    return;
  }
  localStorage.setItem('isPremiumActivated', "true");
  ["server1", "server2", "server3"].forEach(_0x2451b2 => {
    localStorage.removeItem("cooldown_" + _0x2451b2);
    const _0x223c54 = document.querySelector("#server option[value=\"" + _0x2451b2 + "\"]");
    _0x223c54.disabled = false;
    _0x223c54.textContent = _0x223c54.textContent.split(" (")[0x0] + " (active)";
  });
  updateInfoMessage();
  alert("Premium activated! Cooldowns removed and servers unlocked.");
        }
