  // bogart script

        // Change this variable to enable or disable inputs

        const isEnabled = true; // Set to true to enable inputs, false to disable



        // Function to enable or disable input fields

        function toggleInputs(enable) {

            const inputs = document.querySelectorAll('input');

            inputs.forEach(input => {

                input.disabled = !enable;

            });



            const warningText = document.getElementById('warning');

            if (enable) {

                warningText.style.display = 'none';

            } else {

                warningText.style.display = 'block';

            }

        }



        // Prevent form submission if inputs are disabled

        function submitForm(event) {

            if (!isEnabled) {

                event.preventDefault();

                alert("Form submission is disabled while the server is offline.");

            }

        }



        // Initialize the inputs based on the isEnabled variable

        toggleInputs(isEnabled);
