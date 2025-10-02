document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('new-task-text');
    const dateInput = document.getElementById('new-task-date');
    const timeInput = document.getElementById('new-task-time');
    const taskList = document.querySelector('.task-list');

    // Додаємо завдання при натисканні на кнопку
    addTaskBtn.addEventListener('click', addTask);

    // Додаємо завдання при натисканні Enter в полі вводу
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const text = taskInput.value.trim();
        const date = dateInput.value;
        const time = timeInput.value;

        if (text === '') {
            return;
        }

        const newTaskItem = document.createElement('div');
        newTaskItem.classList.add('task-item');
        
        const taskId = `task-${Date.now()}`;

        newTaskItem.innerHTML = `
            <div class="task-left">
                <input type="checkbox" id="${taskId}" class="task-checkbox">
                <label for="${taskId}" class="task-circle"></label>
                <span class="task-text">${text}</span>
            </div>
            <span class="task-time">${date ? formatDate(date) : ''} ${time ? formatTime(time) : ''}</span>
        `;
        
        taskList.appendChild(newTaskItem);
        
        // Очищаємо поля після додавання
        taskInput.value = '';
        dateInput.value = '';
        timeInput.value = '';
        
        // Додаємо обробник подій для нового чекбокса
        const newCheckbox = document.getElementById(taskId);
        newCheckbox.addEventListener('change', (e) => {
            const item = e.target.closest('.task-item');
            if (e.target.checked) {
                item.classList.add('task-item--completed');
            } else {
                item.classList.remove('task-item--completed');
            }
        });
    }

    // Додаємо обробники для вже існуючих завдань на сторінці
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const item = e.target.closest('.task-item');
            if (e.target.checked) {
                item.classList.add('task-item--completed');
            } else {
                item.classList.remove('task-item--completed');
            }
        });
    });

    // Функція для форматування часу (12-годинний формат)
    function formatTime(timeString) {
        const [hour, minute] = timeString.split(':');
        const h = parseInt(hour);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const formattedHour = h % 12 || 12;
        return `${formattedHour}:${minute} ${ampm}`;
    }

    // Функція для форматування дати
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
});
