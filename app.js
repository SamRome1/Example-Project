const themeToggle = document.getElementById('theme-toggle');
// TODO: persist theme preference to localStorage
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
});

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');

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

render();
