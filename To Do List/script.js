const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const dueDateInput = document.getElementById('dueDateInput');
const priorityInput = document.getElementById('priorityInput');
const categoryInput = document.getElementById('categoryInput');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let taskIdCounter = tasks.length;

dueDateInput.addEventListener('change', function() {
    const selectedDate = new Date(this.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
        this.value = '';
        alert("Please select a date in the future.");
    };
});

function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;
    const category = categoryInput.value;

    if (!taskText) {
        alert("Please enter a task.");
        return;
    };

    if (!category) {
        alert("Please enter a category.");
        return;
    };

    if (!dueDate) {
        alert("Please select a due date.");
        return;
    };

    if (!priority) {
        alert("Please select a priority.");
        return;
    };

    const task = {
        id: taskIdCounter++,
        text: taskText,
        dueDate: dueDate,
        priority: priority,
        category: category
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
    };
};

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    taskInput.value = task.text;
    dueDateInput.value = task.dueDate;
    priorityInput.value = task.priority;
    categoryInput.value = task.category;
    const addButton = document.getElementById('addTaskBtn');
    addButton.textContent = 'Save';
    addButton.onclick = function() {
        saveTask(id);
    };
};

function saveTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].text = taskInput.value.trim();
        tasks[taskIndex].dueDate = dueDateInput.value;
        tasks[taskIndex].priority = priorityInput.value;
        tasks[taskIndex].category = categoryInput.value;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        clearInputs();
        displayTasks();
        const addButton = document.getElementById('addTaskBtn');
        addButton.textContent = 'Add';
        addButton.onclick = addTask;
    };
};

function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>Task: ${task.text}</span>
            <span>Due Date: ${task.dueDate}</span>
            <span>Priority: ${task.priority}</span>
            <span>Category: ${task.category}</span>
            <button class="edit-button" onclick="editTask(${task.id})">Edit</button>
            <button class="delete-button" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
    clearInputs();  
};

function clearInputs() {
    taskInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "low";
    categoryInput.value = "";
};

displayTasks();
