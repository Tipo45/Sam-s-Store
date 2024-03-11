
// validation.js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm();
    });

    function validateForm() {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Reset error messages
        resetErrors();

        // Validate username
        if (username.trim() === '') {
            showError('username', 'Username is required');
        } else if (username.trim().length < 4) {
            showError('username', 'Should be at least 4 characters')
        }

        // Validate email
        if (email.trim() === '') {
            showError('email', 'Email is required');
        } else if (!isValidEmail(email)) {
            showError('email', 'Invalid email format');
        }

        // Validate password
        if (password.trim() === '') {
            showError('password', 'Password is required');
        } else if (password.trim().length < 8) {
            showError('password', 'Should be at least 8 characters');
        }

        // Validate confirm password
        if (confirmPassword.trim() === '') {
            showError('confirmPassword', 'Confirm Password is required');
        } else if (confirmPassword.trim().length < 8) {
            showError('confirmPassword', 'Should be at least 8 characters');
        } else if (password !== confirmPassword) {
            showError('confirmPassword', 'Passwords do not match');
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