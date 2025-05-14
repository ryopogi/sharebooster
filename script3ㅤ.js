const serverUrls = {
  'server1': "https://server1-project502.onrender.com",
  'server2': "https://server2-project502.onrender.com",
  'server3': "https://server3-project502.onrender.com"
};

const encodedKeysByDay = {
  0: "S0VZX0JFVExPRw==",
  1: "S0VZX01BS0FOVE9USU4=",
  2: "S0VZX1RBTkdB",
  3: "S0VZX0tVUEFM",
  4: "S0VZX1VMT0w=",
  5: "S0VZX0JVR09L",
  6: "S0VZX05JR0dFUg=="
};

function decodeBase64(input) {
  try {
    return atob(input);
  } catch {
    return '';
  }
}

function getTodayPremiumKey() {
  const day = new Date().getDay();
  return decodeBase64(encodedKeysByDay[day]);
}

function isPremiumUser() {
  const userInputKey = document.getElementById('premium-key').value.trim();
  return userInputKey === getTodayPremiumKey();
}

function isPremiumActivated() {
  return localStorage.getItem("isPremiumActivated") === "true";
}

function setCooldown(server, minutes) {
  const expireTime = Date.now() + minutes * 60 * 1000;
  localStorage.setItem("cooldown_" + server, expireTime);
  updateServerText(server);
}

function getCooldownRemaining(server) {
  const expireTime = parseInt(localStorage.getItem("cooldown_" + server) || '0');
  return expireTime - Date.now();
}

function isCooldownActive(server) {
  return !isPremiumActivated() && getCooldownRemaining(server) > 0;
}

function updateServerText(server) {
  const option = document.querySelector(`#server option[value="${server}"]`);
  const label = option.textContent.split(" (")[0];
  const cooldown = getCooldownRemaining(server);

  if (!isPremiumActivated()) {
    if (server === "server1") {
      if (cooldown > 0) {
        const min = Math.floor(cooldown / 60000);
        const sec = Math.floor((cooldown % 60000) / 1000);
        option.textContent = `${label} (cooldown ${min}:${sec.toString().padStart(2, '0')})`;
        option.disabled = true;
      } else {
        option.textContent = `${label} (available)`;
        option.disabled = false;
      }
    } else {
      option.textContent = `${label} (locked)`;
      option.disabled = true;
    }
  } else {
    option.disabled = false;
    option.textContent = `${label} (active)`;
    localStorage.removeItem("cooldown_" + server);
  }
}

function refreshCooldownUI() {
  ["server1", "server2", "server3"].forEach(updateServerText);
}

function updateStatusText() {
  const infoDiv = document.getElementById("info-message");
  if (isPremiumUser()) {
    localStorage.setItem("isPremiumActivated", "true");
    infoDiv.innerText = "STATUS : Premium User";
    infoDiv.style.color = "#4caf50";
  } else {
    localStorage.setItem("isPremiumActivated", "false");
    infoDiv.innerText = "STATUS : Free User";
    infoDiv.style.color = "#ff9800";
  }
}

setInterval(refreshCooldownUI, 1000);

document.getElementById('premium-key').addEventListener('input', updateStatusText);
document.addEventListener('DOMContentLoaded', () => {
  updateStatusText();
  refreshCooldownUI();
});
