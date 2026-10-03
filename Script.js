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

    li.innerHTML = `
      <div class="task-content" onclick="toggleTask(${index})">
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${escapeHTML(task.text)}</span>
      </div>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
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

// Toggle complete task status
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Sanitize user input
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

// Event Listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Initial load
renderTasks();
