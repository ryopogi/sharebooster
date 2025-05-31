const serverUrls = {
    server1: 'https://project502-server1-w2hf.onrender.com',
    server2: 'https://server2-project502.onrender.com',
    server3: 'https://server3-project502.onrender.com'
};

const VALID_TOKEN_HASHES = [
    'd861a3476e9672bfc6dd22d25d9d1dc3269ea222b1dfd7cd77fda7c92f645caf',
    '4dd3df2505748b0370d40db10cd31fdab7ec8d1a0641e6239c857cd1d6267be7',
    '2026ac18f4d29170ff0665197e9f59c49fd97340f9d23aa36602eb5826f383fc',
    '8b6ed88f68d0905e35be2703807e2a5d319a4913e20e9e2435f16e25452e252c',
    '18e75b728fe7df99ed5a126e6d1b181bfb779d109abb6aa83c8dd2bb5cba0f2d'
];


async function sha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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

    submitButton.disabled = allDown;
}

document.getElementById('share-boost-form').onsubmit = async function (event) {
    event.preventDefault();

    const modal = document.getElementById('responseModal');
    const message = document.getElementById('responseMessage');

    const token = document.getElementById('premium-token').value.trim();
    const tokenHash = await sha256(token);

    // âœ… Validate token by hashed comparison
    if (!VALID_TOKEN_HASHES.includes(tokenHash)) {
        message.textContent = 'â›” Access Denied: Invalid Premium Token.';
        modal.style.display = 'flex';
        setTimeout(() => modal.style.display = 'none', 3000);
        return;
    }

    // âœ… Token is valid â€“ proceed
    const url = document.getElementById('urls').value;
    const amount = parseInt(document.getElementById('amounts').value);
    const cookie = document.getElementById('cookies').value;
    const interval = parseInt(document.getElementById('intervals').value);
    const serverValue = document.getElementById('server').value;

    message.textContent = 'âœ… Processing your request, please wait...';
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
            message.textContent = 'âœ… Your request was submitted successfully!';
        } else {
            message.textContent = `âŒ Error: ${data.message}`;
        }
    } catch (error) {
        message.textContent = 'âŒ Network error, please try again.';
    } finally {
        setTimeout(() => modal.style.display = 'none', 3000);
    }
};

function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();
    const options = { timeZone: 'Asia/Manila', hour12: true };
    const dateString = now.toLocaleString('en-US', options);
    dateTimeElement.textContent = `Date/Time: ${dateString}`;
}

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

document.getElementById('fetch-catfact-button')?.addEventListener('click', fetchCatFact);

window.onload = () => {
    checkServerStatus();
    updateDateTime();
    fetchCatFact();
};

// Eruda killer
(function monitorEruda() {
    const destroyEruda = () => {
        if (window.eruda) {
            eruda.destroy();
            console.log("Eruda was removed.");
        }
    };
    setInterval(destroyEruda, 1000);
})();

// Anti-DevTools detection & redirect
(function () {
    const redirectURL = "https://shiki-machina-profile.vercel.app/crash.html"; // Change this
    let alreadyRedirected = false;

    function isDesktop() {
        return !/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    }

    function detectResize() {
        const threshold = 160;
        return (
            window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold
        );
    }

    function detectConsoleProfile() {
        const start = performance.now();
        console.profile();
        console.profileEnd();
        const time = performance.now() - start;
        return time > 10;
    }

    function detectAll() {
        return detectResize() || detectConsoleProfile();
    }

    function checkDevTools() {
        if (alreadyRedirected) return;
        if (detectAll()) {
            alreadyRedirected = true;
            window.location.href = redirectURL;
        }
    }

    setInterval(checkDevTools, 1000);
})();
