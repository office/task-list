document.addEventListener('DOMContentLoaded', () => {
    const goToTaskListButton = document.getElementById('go-to-task-list');
    const goToDashboardButton = document.getElementById('go-to-dashboard');

    if (goToTaskListButton) {
        goToTaskListButton.addEventListener('click', () => {
            window.location.href = 'task-list.html';
        });
    }

    if (goToDashboardButton) {
        goToDashboardButton.addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });
    }
});
