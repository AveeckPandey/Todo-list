document.addEventListener('DOMContentLoaded', () => {
    const todoinput = document.getElementById("todo-input");
    const button = document.getElementById("add-new-task-btn");
    const list = document.getElementById("todo-list");

    // Correctly initialize tasks array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render saved tasks from localStorage
    tasks.forEach(task => renderTask(task));

    button.addEventListener('click', () => {
        const taskText = todoinput.value.trim(); // Correct variable name
        if (taskText === "") return; // Ensure task text is not empty

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };

        tasks.push(newTask);
        saveTasks(); // Save updated tasks to localStorage
        renderTask(newTask); // Render the new task
        todoinput.value = ""; // Clear the input field
    });

    function renderTask(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${task.text}</span>
            <button>delete</button>
        `;

        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return; // Skip toggle if button clicked
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTasks();
        });

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id); // Remove task from array
            saveTasks(); // Save updated tasks
            li.remove(); // Remove task from UI
        });

        list.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Correct localStorage key
    }
});
