document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const colors = [
        '#ffd700', '#ff7f50', '#87cefa', '#98fb98',
        '#dda0dd', '#f0e68c', '#ff69b4', '#afeeee',
    ];

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const stickyNote = document.createElement('div');
            stickyNote.className = `sticky-note ${todo.completed ? 'completed' : ''}`;
            stickyNote.style.backgroundColor = todo.color || getRandomColor();

            stickyNote.innerHTML = `
                <div class="task-content">
                    <input type="checkbox" class="checkbox" ${todo.completed ? 'checked' : ''}>
                    <p>${todo.text}</p>
                </div>
                <button class="delete-btn">Delete</button>
            `;

            const checkbox = stickyNote.querySelector('.checkbox');
            const deleteBtn = stickyNote.querySelector('.delete-btn');

            // Add click event to the sticky note to toggle checkbox
            stickyNote.addEventListener('click', (e) => {
                // Prevent the delete button click from toggling the checkbox
                if (e.target !== deleteBtn) {
                    checkbox.checked = !checkbox.checked;  // Toggle checkbox
                    toggleTodo(index);  // Update todo state
                }
            });

            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();  // Prevent delete button from toggling checkbox
                deleteTodo(index);
            });

            todoList.appendChild(stickyNote);
        });
        saveTodos();
    }

    function addTodo(text) {
        todos.push({ text, completed: false, color: getRandomColor() });
        renderTodos();
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        renderTodos();
    }

    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            addTodo(text);
            input.value = '';
        }
    });

    renderTodos();
});
