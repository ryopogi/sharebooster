const serverUrls = {
    server1: 'https://server1-project502.onrender.com',
    server2: 'https://server2-project502.onrender.com',
    server3: 'https://server3-project502.onrender.com'
};

function getCooldownData() {
    const data = localStorage.getItem('submissionData');
    return data ? JSON.parse(data) : { count: 0, lastSubmission: null };
}

function setCooldownData(data) {
    localStorage.setItem('submissionData', JSON.stringify(data));
}

function isCooldownActive() {
    const data = getCooldownData();
    if (data.count < 3) return false;
    const now = new Date().getTime();
    const last = new Date(data.lastSubmission).getTime();
    const diff = now - last;
    return diff < 20 * 60 * 1000; // 20 minutes
}

function updateCooldownState() {
    const submitButton = document.getElementById('submit-button');
    const infoMessage = document.getElementById('info-message');
    const warning = document.getElementById('cooldown-warning');

    if (isCooldownActive()) {
        submitButton.disabled = true;
        infoMessage.style.display = 'none';
        warning.style.display = 'block';

        const timeLeft = 20 * 60 * 1000 - (new Date().getTime() - new Date(getCooldownData().lastSubmission).getTime());

        setTimeout(() => {
            const newData = { count: 0, lastSubmission: null };
            setCooldownData(newData);
            submitButton.disabled = false;
            warning.style.display = 'none';
            infoMessage.style.display = 'block';
        }, timeLeft);
    } else {
        warning.style.display = 'none';
        infoMessage.style.display = 'block';
    }
}

async function checkServerStatus() {
    const servers = document.querySelectorAll('#server option');
    let allDown = true;
    const submitButton = document.getElementById('submit-button');

    for (const server of servers) {
        try {
            const response = await fetch(serverUrls[server.value]);
            if (response.ok) {
                server.textContent = `${server.textContent.split(' (')[0]} (active)`;
                allDown = false;
            } else {
                server.textContent = `${server.textContent.split(' (')[0]} (down)`;
            }
        } catch {
            server.textContent = `${server.textContent.split(' (')[0]} (down)`;
        }
    }

    if (!isCooldownActive()) {
        submitButton.disabled = allDown;
    }
}

document.getElementById('share-boost-form').onsubmit = async function (event) {
    event.preventDefault();
    const modal = document.getElementById('responseModal');
    const message = document.getElementById('responseMessage');
    const url = document.getElementById('urls').value;
    const amount = parseInt(document.getElementById('amounts').value);
    const cookie = document.getElementById('cookies').value;
    const interval = parseInt(document.getElementById('intervals').value);
    const serverValue = document.getElementById('server').value;
    const warning = document.getElementById('cooldown-warning');
    const infoMessage = document.getElementById('info-message');

    if (isCooldownActive()) {
        message.textContent = 'Cooldown active. Please wait before submitting again.';
        warning.style.display = 'block';
        infoMessage.style.display = 'none';
        modal.style.display = 'flex';
        setTimeout(() => modal.style.display = 'none', 3000);
        return;
    }

    warning.style.display = 'none';
    infoMessage.style.display = 'block';
    message.textContent = 'Processing your request, please wait...';
    modal.style.display = 'flex';

    try {
        const server = serverUrls[serverValue];
        const response = await fetch(`${server}/api/submit`, {
            method: 'POST',
            body: JSON.stringify({ cookie, url, amount, interval }),
            headers: { 'Content-Type': 'application/json' }
        });

        const resData = await response.json();

        if (resData.status === 200) {
            message.textContent = 'Your request was submitted successfully!';
            const data = getCooldownData();
            data.count += 1;
            data.lastSubmission = new Date();
            setCooldownData(data);

            if (data.count >= 3) {
                updateCooldownState();
            }
        } else {
            message.textContent = `Error: ${resData.message}`;
        }
    } catch (error) {
        message.textContent = 'Network error, please try again.';
    } finally {
        setTimeout(() => modal.style.display = 'none', 3000);
    }
};

function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();
    const options = { timeZone: 'Asia/Manila', hour12: true };
    const dateString = now.toLocaleString('en-US', options);
    dateTimeElement.textContent = `Date/Time : ${dateString}`;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const modeSwitch = document.getElementById('mode-switch');
    modeSwitch.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

document.getElementById('mode-switch').addEventListener('click', toggleDarkMode);

setInterval(updateDateTime, 1000);

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

window.onload = () => {
    checkServerStatus();
    updateDateTime();
    fetchCatFact();
    updateCooldownState(); // Check cooldown on page load
};
