const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskDescriptionInput = document.getElementById('task-description');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.textContent = `${task.name} - ${task.description}`;

    const starButton = document.createElement('button');
    starButton.textContent = task.isStarred ? '★' : '☆';
    starButton.classList.add('star-button');
    starButton.addEventListener('click', () => {
        task.isStarred = !task.isStarred;
        starButton.textContent = task.isStarred ? '★' : '☆';
        saveTasks();
    });

    const completeButton = document.createElement('button');
    completeButton.textContent = task.isCompleted ? 'Completed' : 'In Progress';
    completeButton.classList.add('complete-button');
    completeButton.addEventListener('click', () => {
        task.isCompleted = !task.isCompleted;
        completeButton.textContent = task.isCompleted ? 'Completed' : 'In Progress';
        saveTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        tasks = tasks.filter((t) => t.id !== task.id);
        saveTasks();
        taskList.removeChild(li);
    });

    li.appendChild(starButton);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

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
