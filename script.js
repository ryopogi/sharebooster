const serverUrls = {
    server1: 'https://server1-project502.onrender.com',
    server2: 'https://server2-project502.onrender.com',
    server3: 'https://server3-project502.onrender.com'
};

// Cooldown Utilities
function setCooldown(serverKey, minutes) {
    const cooldownUntil = Date.now() + minutes * 60 * 1000;
    localStorage.setItem(`cooldown_${serverKey}`, cooldownUntil);
    updateServerText(serverKey, true);
}

function isCooldownActive(serverKey) {
    const cooldownUntil = parseInt(localStorage.getItem(`cooldown_${serverKey}`) || '0');
    return Date.now() < cooldownUntil;
}

function updateServerText(serverKey, isCooldown) {
    const serverOptions = document.querySelectorAll('#server option');
    serverOptions.forEach(option => {
        if (option.value === serverKey) {
            const baseText = option.textContent.split(' (')[0];
            option.textContent = isCooldown ? `${baseText} (cooldown)` : `${baseText} (active)`;
        }
    });
}

function refreshCooldownUI() {
    const serverOptions = document.querySelectorAll('#server option');
    serverOptions.forEach(option => {
        const serverKey = option.value;
        if (isCooldownActive(serverKey)) {
            updateServerText(serverKey, true);
        }
    });
}

// Server status check
async function checkServerStatus() {
    const servers = document.querySelectorAll('#server option');
    let allDown = true;
    const submitButton = document.getElementById('submit-button');

    for (const server of servers) {
        try {
            const response = await fetch(serverUrls[server.value]);
            if (response.ok) {
                if (!isCooldownActive(server.value)) {
                    server.textContent = `${server.textContent.split(' (')[0]} (active)`;
                }
                allDown = false;
            } else {
                server.textContent = `${server.textContent.split(' (')[0]} (down)`;
            }
        } catch {
            server.textContent = `${server.textContent.split(' (')[0]} (down)`;
        }
    }

    submitButton.disabled = allDown;
}

// Form submission with cooldown
document.getElementById('share-boost-form').onsubmit = async function (event) {
    event.preventDefault();
    const modal = document.getElementById('responseModal');
    const message = document.getElementById('responseMessage');
    const url = document.getElementById('urls').value;
    const amount = parseInt(document.getElementById('amounts').value);
    const cookie = document.getElementById('cookies').value;
    const interval = parseInt(document.getElementById('intervals').value);
    const serverValue = document.getElementById('server').value;

    if (isCooldownActive(serverValue)) {
        alert(`This server is on cooldown. Please wait before using it again.`);
        return;
    }

    message.textContent = 'Processing your request, please wait...';
    modal.style.display = 'flex';

    try {
        const server = serverUrls[serverValue];
        const response = await fetch(`${server}/api/submit`, {
            method: 'POST',
            body: JSON.stringify({ cookie, url, amount, interval }),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (data.status === 200) {
            message.textContent = 'Your request was submitted successfully!';
            const cooldownMinutes = serverValue === 'server1' ? 15 : 20;
            setCooldown(serverValue, cooldownMinutes);
        } else {
            message.textContent = `Error: ${data.message}`;
        }
    } catch (error) {
        message.textContent = 'Network error, please try again.';
    } finally {
        setTimeout(() => modal.style.display = 'none', 3000);
    }
};

// Date/Time update
function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();
    const options = { timeZone: 'Asia/Manila', hour12: true };
    const dateString = now.toLocaleString('en-US', options);
    dateTimeElement.textContent = `Date/Time : ${dateString}`;
}

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const modeSwitch = document.getElementById('mode-switch');
    modeSwitch.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

document.getElementById('mode-switch').addEventListener('click', toggleDarkMode);

// Cat fact
async function fetchCatFact() {
    const display = document.getElementById('catfact-text');
    display.textContent = 'Fetching cat fact...';
    try {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        display.textContent = data.fact || 'Could not fetch a cat fact.';
    } catch {
        display.textContent = 'An error occurred. Please try again.';
    }
}

document.getElementById('fetch-catfact-button').addEventListener('click', fetchCatFact);

// Initial load
window.onload = () => {
    checkServerStatus();
    updateDateTime();
    fetchCatFact();
    refreshCooldownUI();
};

setInterval(updateDateTime, 1000);
