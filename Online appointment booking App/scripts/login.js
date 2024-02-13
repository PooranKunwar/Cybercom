function isValidUsername(username) {
    return username.trim() !== '' && username.length >= 4;
}

function isValidPassword(password) {
    return password.trim() !== '' && password.length >= 6;
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

    if (!isValidUsername(username)) {
        showError('Invalid username.');
        return;
    }

    if (!isValidPassword(password)) {
        showError('Invalid password.');
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
