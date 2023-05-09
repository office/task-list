const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskDescriptionInput = document.getElementById('task-description');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks on page load
tasks.forEach(renderTask);

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = taskNameInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();

    if (!taskName || !taskDescription) {
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        description: taskDescription,
        isStarred: false,
        isCompleted: false,
    };

    tasks.push(task);
    saveTasks();

    renderTask(task);
    taskForm.reset();
});

function renderTask(task) {
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.dataset.id = task.id;

    const starButton = document.createElement('button');
    starButton.textContent = task.isStarred ? '⭐' : '☆';
    starButton.classList.add('star-button');
    starButton.addEventListener('click', () => {
        task.isStarred = !task.isStarred;
        starButton.textContent = task.isStarred ? '⭐' : '☆';
        saveTasks();
    });
const completeButton = document.createElement('button');
completeButton.textContent = task.isCompleted ? '✓' : '✗';
completeButton.classList.add('complete-button');
completeButton.addEventListener('click', () => {
  task.isCompleted = !task.isCompleted;
  completeButton.textContent = task.isCompleted ? '✓' : '✗';
  saveTasks();
});
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        const index = tasks.findIndex(t => t.id === task.id);
        tasks.splice(index, 1);
        saveTasks();
        taskList.removeChild(li);
    });

    const taskName = document.createElement('span');
    taskName.textContent = task.name;
    taskName.classList.add('task-name');

    const taskDescription = document.createElement('p');
    taskDescription.textContent = task.description;
    taskDescription.classList.add('task-description');

    li.appendChild(starButton);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    li.appendChild(taskName);
    li.appendChild(taskDescription);
    taskList.appendChild(li);
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
