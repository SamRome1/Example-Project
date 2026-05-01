const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app-screen');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username-input');
const userLabel = document.getElementById('user-label');
const logoutBtn = document.getElementById('logout-btn');

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// TODO: replace with real auth — currently just stores username in sessionStorage
let currentUser = sessionStorage.getItem('user');

function showApp(username) {
  currentUser = username;
  userLabel.textContent = `Signed in as ${username}`;
  loginScreen.classList.add('hidden');
  appScreen.classList.remove('hidden');
  loadTodos();
}

function showLogin() {
  currentUser = null;
  sessionStorage.removeItem('user');
  appScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (!username) return;
  sessionStorage.setItem('user', username);
  showApp(username);
});

logoutBtn.addEventListener('click', showLogin);

let todos = [];

function loadTodos() {
  // TODO: scope todos per user (currently shared across all users)
  todos = JSON.parse(localStorage.getItem('todos') || '[]');
  render();
}

function render() {
  list.innerHTML = '';
  todos.forEach((todo, i) => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('done');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => toggle(i));

    const span = document.createElement('span');
    span.textContent = todo.text;

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.addEventListener('click', () => remove(i));

    li.append(checkbox, span, del);
    list.appendChild(li);
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

function toggle(i) {
  todos[i].done = !todos[i].done;
  render();
}

function remove(i) {
  todos.splice(i, 1);
  render();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  todos.push({ text: input.value.trim(), done: false });
  input.value = '';
  render();
});

if (currentUser) {
  showApp(currentUser);
}
