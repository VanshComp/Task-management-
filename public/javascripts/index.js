document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    // Retrieve hidden tasks from localStorage if available
    const hiddenTasks = JSON.parse(localStorage.getItem('hiddenTasks')) || [];

    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const taskElement = this.closest('.task');
            const filename = taskElement.querySelector('h1').innerText.trim();

            // Add filename to hiddenTasks array
            hiddenTasks.push(filename);
            localStorage.setItem('hiddenTasks', JSON.stringify(hiddenTasks));

            // Hide the task element
            taskElement.style.display = 'none';  
        });

        // Check if the task should be hidden on page load
        const taskElement = button.closest('.task');
        const filename = taskElement.querySelector('h1').innerText.trim();
        if (hiddenTasks.includes(filename)) {
            taskElement.style.display = 'none';
        }
    });
});
