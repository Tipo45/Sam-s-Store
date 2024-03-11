
// validation.js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm();
    });

    function validateForm() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

         resetErrors();

          // Validate email
        if (email.trim() === '') {
            showError('email', 'Email is required');
        } else if (!isValidEmail(email)) {
            showError('email', 'Invalid email format');
        }

        // Validate password
        if (password.trim() === '') {
            showError('password', 'Password is required');
        }
     }

    function showError(field, errorMessage) {
        const errorElement = document.getElementById(`${field}Error`);
        errorElement.innerText = errorMessage;
    }

    function resetErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(function (element) {
            element.innerText = '';
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});