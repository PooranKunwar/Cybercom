function isValiduserFullname(userFullname) {
    return userFullname.trim() !== '';
}

function isValidUsername(username) {
    return username.trim() !== '' && username.length >= 4;
}

function isValidPassword(password) {
    return password.trim() !== '' && password.length >= 6;
}

function isValidRole(role) {
    return role.trim() !== '';
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

function getNextId() {
    var registrations = getRegistrations();
    return registrations.length > 0 ? registrations[registrations.length - 1].id + 1 : 1;
}

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var userFullname = document.getElementById('userFullname');
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');
    var roleInput = document.getElementById('role');

    var userFullname = userFullname.value;
    var username = usernameInput.value;
    var password = passwordInput.value;
    var role = roleInput.value;
    var id = getNextId();


    if (!isValiduserFullname(userFullname)) {
        showError('Enter full name !');
        return;
    }

    if (!isValidUsername(username)) {
        showError('Username must be at least 4 characters long !');
        return;
    }

    if (!isValidPassword(password)) {
        showError('Password must be at least 6 characters long !');
        return;
    }

    if (!isValidRole(role)) {
        showError('Enter Role !');
        return;
    }

    var registrations = getRegistrations();

    if (registrations.some(registration => registration.username === username)) {
        showError('Username already exists.');
        return;
    }

    registrations.push({ id: id, fullname:userFullname, username: username, password: password, role: role });

    localStorage.setItem('registrations', JSON.stringify(registrations));

    window.location.href = 'login.html';
    alert('Registration successful');
    
});

document.querySelectorAll('input, select').forEach(function(input) {
    input.addEventListener('input', clearError);
});




