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

    var doctor = document.getElementById('doctor').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;
    const patientName = localStorage.getItem("currentUser");

    if (!doctor || !date || !time || !patientName) {
        var appointmentMessage = document.getElementById('appointment-message');
        appointmentMessage.textContent = 'Please fill all fields';
        appointmentMessage.style.color = 'red';
        return;
    }

    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const id = getNextAppointmentId();

    const appointment = {
        id: id,
        name: patientName,
        doctor: doctor,
        date: date,
        time: time,
        status: 'Scheduled',
    };

    appointments.push(appointment);

    localStorage.setItem("appointments", JSON.stringify(appointments));

    var appointmentMessage = document.getElementById('appointment-message');
    appointmentMessage.textContent = 'Appointment booked successfully!';
    appointmentMessage.style.color = 'green';
    displayAppointments();
}

function displayAppointments() {
    var currentUser = localStorage.getItem("currentUser");
    var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    var appointmentsList = document.getElementById('appointments-list');
    appointmentsList.innerHTML = '';

    var userAppointments = appointments.filter(function(appointment) {
        return appointment.name === currentUser;
    });

    if (userAppointments.length === 0) {
        appointmentsList.innerHTML = '<p>No appointments scheduled.</p>';
    } else {
        appointmentsList.innerHTML = '<ul>';
        userAppointments.forEach(function(appointment) {
            appointmentsList.innerHTML += `
                <li>
                    Name : ${appointment.name}, Date & Time : ${appointment.date} - ${appointment.time} with ${appointment.doctor}, Statues : ${appointment.status}
                </li>
            `;
        });
        appointmentsList.innerHTML += '</ul>';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
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
