function updateDoctorOptions() {
    var registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    var doctorSelect = document.getElementById('doctor');
    doctorSelect.innerHTML = '';

    var doctors = registrations.filter(function(registration) {
        return registration.role === 'doctor';
    });

    doctors.forEach(function(doctor) {
        var option = document.createElement('option');
        option.value = doctor.fullname;
        option.textContent = doctor.fullname; 
        doctorSelect.appendChild(option);
    });
}

function getNextAppointmentId() {
    var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    return appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1;
}

function bookAppointment(event) {
    event.preventDefault();
    
    var name = document.getElementById('name').value; 
    var doctor = document.getElementById('doctor').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;

    if (!name || !doctor || !date || !time) {
        var appointmentMessage = document.getElementById('appointment-message');
        appointmentMessage.textContent = 'Please fill all fields';
        appointmentMessage.style.color = 'red';
        return;
    }

    var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    var id = getNextAppointmentId();

    appointments.push({
        id: id,
        name: name,
        doctor: doctor,
        date: date,
        time: time
    });

    localStorage.setItem('appointments', JSON.stringify(appointments));

    var appointmentMessage = document.getElementById('appointment-message');
    appointmentMessage.textContent = 'Appointment booked successfully!';
    appointmentMessage.style.color = 'green';

    document.getElementById('name').value = '';
    document.getElementById('doctor').value = '';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';

    displayAppointments();
}


function displayAppointments() {
    var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    var appointmentsList = document.getElementById('appointments-list');
    appointmentsList.innerHTML = '';

    if (appointments.length === 0) {
        appointmentsList.innerHTML = '<p>No appointments scheduled.</p>';
    } else {
        appointmentsList.innerHTML = '<ul>';
        appointments.forEach(function(appointment) {
            appointmentsList.innerHTML += `
                <li>
                    ${appointment.date} - ${appointment.time} with ${appointment.doctor} (Patient: ${appointment.name}) 
                </li>
            `;
        });
        appointmentsList.innerHTML += '</ul>';
    }
}

function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    window.location.href = 'login.html';
}

window.onload = function() {
    updateDoctorOptions();
    displayAppointments();
    document.getElementById('appointment-form').addEventListener('submit', bookAppointment);
    document.getElementById('logout-btn').addEventListener('click', logout);
};
