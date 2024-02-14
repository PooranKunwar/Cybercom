document.addEventListener("DOMContentLoaded", function () {
    displayAppointments();
    document.getElementById('availability-form').addEventListener('submit', setAvailability);
});

function displayAppointments() {
    var appointmentsList = document.getElementById("appointments-list");
    var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointmentsList.innerHTML = "";

    appointments.forEach(function (appointment, index) {
        var appointmentDiv = document.createElement("div");
        appointmentDiv.classList.add("appointment");
        var statusClass = appointment.status === "Pending" ? "pending" : appointment.status === "Approved" ? "approved" : "rejected";
        appointmentDiv.innerHTML = `
            <p>Patient Name: ${appointment.name}</p>
            <p>Date & Time: ${appointment.date} - ${appointment.time}</p>
            <p>Status: <span class="${statusClass}">${appointment.status}</span></p>
            <button class="approve-btn" onclick="approveAppointment(${index})">Approve</button>
            <button class="reschedule-btn" onclick="openRescheduleModal(${index})">Reschedule</button>
            <button class="reject-btn" onclick="rejectAppointment(${index})">Reject</button>
        `;
        appointmentsList.appendChild(appointmentDiv);
    });
}

function approveAppointment(index) {
    var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments[index].status = "Approved";
    localStorage.setItem('appointments', JSON.stringify(appointments));
    displayAppointments();
}

function rejectAppointment(index) {
    var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments[index].status = "Rejected";
    localStorage.setItem('appointments', JSON.stringify(appointments));
    displayAppointments();
}

function openRescheduleModal(index) {
    var modal = document.getElementById('reschedule-modal');
    var appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    var appointment = appointments[index];
    document.getElementById('date').value = appointment.date;
    document.getElementById('time').value = appointment.time;
}

function setAvailability(event) {
    event.preventDefault();
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;

    var appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    var index = -1;
    for (var i = 0; i < appointments.length; i++) {
        if (appointments[i].status !== 'Approved') {
            index = i;
            break;
        }
    }

    if (index === -1) {
        alert('No pending appointments found to reschedule.');
        return;
    }

    appointments[index].date = date;
    appointments[index].time = time;
    appointments[index].status = 'Rescheduled';

    localStorage.setItem('appointments', JSON.stringify(appointments));

    document.getElementById('date').value = '';
    document.getElementById('time').value = '';

    alert('Availability set successfully for the selected patient!');

    displayAppointments();
}



function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    window.location.href = 'login.html';
}

document.getElementById('logout-btn').addEventListener('click', logout);
