// script.js
document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const pendingTasks = document.getElementById("pendingTasks");
    const completedTasks = document.getElementById("completedTasks");

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => addTaskToDOM(task.text, task.completed));
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("li").forEach((li) => {
            tasks.push({
                text: li.querySelector("span").innerText,
                completed: li.classList.contains("completed"),
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add task to the appropriate section
    function addTaskToDOM(taskText, completed = false) {
        const li = document.createElement("li");
        li.className = completed ? "completed" : "";

        const taskSpan = document.createElement("span");
        taskSpan.innerText = taskText;

        const taskButtons = document.createElement("div");
        taskButtons.className = "task-buttons";

        // Complete checkbox
        const completeCheckbox = document.createElement("input");
        completeCheckbox.type = "checkbox";
        completeCheckbox.checked = completed;
        completeCheckbox.addEventListener("change", () => {
            li.classList.toggle("completed", completeCheckbox.checked);
            moveTask(li, completeCheckbox.checked);
            saveTasks();
        });
        taskButtons.appendChild(completeCheckbox);

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.className = "edit";
        editBtn.innerText = "Edit";
        editBtn.addEventListener("click", () => {
            const newTask = prompt("Edit task:", taskSpan.innerText);
            if (newTask) {
                taskSpan.innerText = newTask;
                saveTasks();
            }
        });
        taskButtons.appendChild(editBtn);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete";
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
            li.remove();
            saveTasks();
        });
        taskButtons.appendChild(deleteBtn);

        li.appendChild(taskSpan);
        li.appendChild(taskButtons);

        moveTask(li, completed);
    }

    // Move task between pending and completed sections
    function moveTask(taskElement, isCompleted) {
        if (isCompleted) {
            completedTasks.appendChild(taskElement);
        } else {
            pendingTasks.appendChild(taskElement);
        }
        saveTasks();
    }

    // Add task button
    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToDOM(taskText);
            taskInput.value = "";
        }
    });

    // Load tasks on page load
    loadTasks();
});
