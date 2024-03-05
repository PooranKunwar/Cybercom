function isValidUsername(username) {
    var errors = [];

    if (username.trim() === '') {
        errors.push('Please enter a username.');
    }

    return errors.length === 0 ? true : errors;
}

function isValidPassword(password) {
    var errors = [];

    if (password.trim() === '') {
        errors.push('Please enter a password.');
    }

    return errors.length === 0 ? true : errors;
}

function showError(message) {
    document.getElementById('error-message').textContent = message;
}

function clearError() {
    document.getElementById('error-message').textContent = '';
}

function getRegistrations() {
    return JSON.parse(localStorage.getItem('registrations')) || [];
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var usernameValidation = isValidUsername(username);
    if (usernameValidation !== true) {
        showError(usernameValidation.join(' '));
        return;
    }

    var passwordValidation = isValidPassword(password);
    if (passwordValidation !== true) {
        showError(passwordValidation.join(' '));
        return;
    }

    var registrations = getRegistrations();

    var user = registrations.find(function(registration) {
        return registration.username === username && registration.password === password;
    });

    if (!user) {
        showError('Invalid username or password.');
        return;
    }

    localStorage.setItem("currentUser", username)

    if (user.role === 'patient') {
        window.location.href = 'patientdashboard.html';
    } 
    else if (user.role === 'doctor') {
        window.location.href = 'doctordashboard.html';
    }
});

document.querySelectorAll('input').forEach(function(input) {
    input.addEventListener('input', clearError);
});
