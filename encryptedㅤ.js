<!-- Status div (initially hidden) -->
<div id="scriptStatus" style="display: none; color: red;"></div>

<script>
// Toggle to enable or disable the external script
var loadExternalScript = true; // Set to false to disable the script

var statusDiv = document.getElementById('scriptStatus');

if (loadExternalScript) {
    // Load the external JavaScript file
    var script = document.createElement('script');
    script.src = 'https://sharebooster.neocities.org/script%E3%85%A4.js'; // Path to your JavaScript file
    document.head.appendChild(script);
} else {
    statusDiv.style.display = 'block';
    statusDiv.textContent = "Script is disabled";
}
</script>
