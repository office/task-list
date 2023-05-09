document.addEventListener('DOMContentLoaded', () => {
  const totalTasks = document.getElementById('total-tasks');
  const completedTasks = document.getElementById('completed-tasks');
  const starredTasks = document.getElementById('starred-tasks');

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  totalTasks.textContent = tasks.length;
  completedTasks.textContent = tasks.filter(task => task.isCompleted).length;
  starredTasks.textContent = tasks.filter(task => task.isStarred).length;
});
