function isValidUserFullname(userFullname) {
    return /^[A-Za-z\s]+$/.test(userFullname.trim());
}

function isValidUsername(username) {
    var errors = [];

    if (username.trim() === '') {
        errors.push('Please enter a username.');
    } 
    
    else if (username.length < 4) {
        errors.push('Username must be at least 4 characters long.');
    }

    return errors.length === 0 ? true : errors;
}

function isValidPassword(password) {

    var errors = [];

    if (password.trim() === '') {
        errors.push('Please enter a password.');
    } 
    
    else if (password.length < 6) {
        errors.push('Password must be at least 6 characters long.');
    }

    else if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter.');
    }

    else if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter.');
    }

    else if (!/\d/.test(password)) {
        errors.push('Password must contain at least one digit.');
    }

    else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
        errors.push('Password must contain at least one special character.');
    }

    return errors.length === 0 ? true : errors;
}

function isValidRole(role) {
    return role.trim() !== '';
}

function showError(message) {
    var errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
}

function clearError() {
    var errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
}

function getRegistrations() {
    return JSON.parse(localStorage.getItem('registrations')) || [];
}

function getNextId() {
    var registrations = getRegistrations();
    return registrations.length > 0 ? registrations[registrations.length - 1].id + 1 : 1;
}

function registerUser(event) {
    event.preventDefault();

    var userFullnameInput = document.getElementById('userFullname');
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirm-password');
    var roleInput = document.getElementById('role');

    var userFullname = userFullnameInput.value;
    var username = usernameInput.value;
    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;
    var role = roleInput.value;
    var id = getNextId();

    clearError();

    if (!isValidUserFullname(userFullname)) {
        showError('Please enter a valid full name containing only alphabets.');
        return;
    }

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

    if (password !== confirmPassword) {
        showError('Passwords do not match.');
        return;
    }

    if (!isValidRole(role)) {
        showError('Please select your role.');
        return;
    }

    var registrations = getRegistrations();

    if (registrations.some(registration => registration.username === username)) {
        showError('Username already exists.');
        return;
    }

    registrations.push({ id: id, fullname: userFullname, username: username, password: password, role: role });
    localStorage.setItem('registrations', JSON.stringify(registrations));

    window.location.href = 'login.html';
    alert('Registration successful');
}

document.getElementById('registration-form').addEventListener('submit', registerUser);

document.querySelectorAll('input, select').forEach(function (input) {
    input.addEventListener('input', clearError);
});
