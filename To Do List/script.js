const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let taskIdCounter = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;

function addTask() {
    const taskText = taskInput.value.trim();

    const task = {
        id: taskIdCounter++,
        text: taskText,
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    clearInputs();
    displayTasks();
};

function deleteTask(id) {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if (confirmed) {
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const newTaskText = prompt("Edit the Task : ", task.text);
    if (newTaskText !== null) {
        task.text = newTaskText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    };
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>Task: ${task.text}</span>
            <hr>
            <button class="edit-button" onclick="editTask(${task.id})">Edit</button>
            <button class="delete-button" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
};

function clearInputs() {
    taskInput.value = "";
};

displayTasks();
