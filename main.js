let todoItems = [];

function renderTodo(todo) {
    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
    const list = document.querySelector('.list');
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        item.remove();
        return
    }

    const isChecked = todo.checked ? 'done': '';
    const node = document.createElement("li");

    if (item) {
        if (isChecked) {
            node.setAttribute('class', `task2 ${isChecked}`);
            node.setAttribute('data-key', todo.id);
            node.innerHTML = `
                <div for="${todo.id}" class="circle2" type="checkbox"> </div>
                <h3 class="task_txt2">${todo.text}</h3>
                <span class="material-symbols-outlined" style="color: white; margin: auto; padding-right: 20px; visibility: visible; cursor: pointer;">delete</span>
            `;
        }
        else {
            node.setAttribute('class', `task ${isChecked}`);
            node.setAttribute('data-key', todo.id);
            node.innerHTML = `
                <div for="${todo.id}" class="circle" type="checkbox"> </div>
                <h3 class="task_txt">${todo.text}</h3>
                <span class="material-symbols-outlined" style="color: white; margin: auto; padding-right: 20px; visibility: hidden; cursor: pointer;">delete</span>
            `;
        }
        list.replaceChild(node, item);
    } else {
        node.setAttribute('class', `task ${isChecked}`);
        node.setAttribute('data-key', todo.id);
        node.innerHTML = `
            <div for="${todo.id}" class="circle" type="checkbox"> </div>
            <h3 class="task_txt">${todo.text}</h3>
            <span class="material-symbols-outlined" style="color: white; margin: auto; padding-right: 20px; visibility: hidden; cursor: pointer;">delete</span>
        `;
        list.append(node);
    }
  }

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
}

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
  }

  function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
      deleted: true,
      ...todoItems[index]
    };
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
  }

const form = document.querySelector('.add_bar');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.add_txt');

  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

const list = document.querySelector('.list');
list.addEventListener('click', event => {
  if (event.target.classList.contains('circle') | event.target.classList.contains('circle2')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  if (event.target.classList.contains('material-symbols-outlined')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
      todoItems = JSON.parse(ref);
      todoItems.forEach(t => {
        renderTodo(t);
      });
    }
  });

