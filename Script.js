
// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks to LocalStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks to the UI
function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = '<p class="empty-state">No tasks available. Add one above!</p>';
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) {
      li.classList.add('completed');
    }

    // Attach data attribute to track task index securely
    li.dataset.index = index;

    li.innerHTML = `
      <div class="task-content">
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <span>${escapeHTML(task.text)}</span>
      </div>
      <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(li);
  });
}

// Add new task
function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;

  tasks.push({ text: text, completed: false });
  taskInput.value = '';
  saveTasks();
  renderTasks();
}

// Handle task clicks (Toggle complete vs Delete) using Event Delegation
taskList.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;

  const index = parseInt(li.dataset.index, 10);

  // Delete button clicked
  if (e.target.classList.contains('delete-btn')) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    return;
  }

  // Task row or checkbox clicked
  if (e.target.classList.contains('task-checkbox') || e.target.closest('.task-content')) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }
});

// Sanitize user inputs against XSS
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Event Listeners for adding tasks
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Initial load
renderTasks();
