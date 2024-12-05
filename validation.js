document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form.needs-validation");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");
    const submitButton = document.querySelector("button[type='submit']");

    // Initial state for the button
    updateSubmitButton(false);

    // Add real-time validation
    emailField.addEventListener("input", validateFields);
    messageField.addEventListener("input", validateFields);

    // Prevent default form submission if invalid
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const isValid = validateFields(true);

        if (isValid) {
            form.submit(); // Submit if valid
        }
    });

    function validateFields(showErrors = false) {
        let isValid = true;

        // Email validation
        const emailValue = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            if (showErrors) showError(emailField, "Please enter a valid email address.");
            isValid = false;
        } else {
            clearError(emailField);
        }

        // Message validation
        const messageValue = messageField.value.trim();
        const wordCount = messageValue.split(/\s+/).filter(word => word.length > 0).length;
        if (wordCount <= 3) {
            if (showErrors) showError(messageField, "Your message must contain more than 3 words.");
            isValid = false;
        } else {
            clearError(messageField);
        }

        // Update submit button state
        updateSubmitButton(isValid);

        return isValid;
    }

    // Function to show error message
    function showError(field, message) {
        let errorDiv = field.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains("invalid-feedback")) {
            errorDiv = document.createElement("div");
            errorDiv.classList.add("invalid-feedback", "text-danger");
            field.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        field.classList.add("is-invalid");
    }

    // Function to clear error message
    function clearError(field) {
        let errorDiv = field.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains("invalid-feedback")) {
            errorDiv.textContent = "";
        }
        field.classList.remove("is-invalid");
    }

    // Function to update the submit button state
    function updateSubmitButton(isValid) {
        if (isValid) {
            submitButton.disabled = false;
            submitButton.style.backgroundColor = "lightgreen";
            submitButton.textContent = "Send";
        } else {
            submitButton.disabled = true;
            submitButton.style.backgroundColor = "gray";
            submitButton.textContent = "Please fill the fields";
        }
    }
});
