const list = document.getElementById('todos');
document.querySelector('button').addEventListener('click', handleClick); 
document.addEventListener('DOMContentLoaded', loadTodos);

function handleClick() { 
    const newTodo = this.previousElementSibling.value.trim();

    if (newTodo) { 
        createTodo(newTodo);
        saveToStorage(newTodo);
        this.previousElementSibling.value = ''; 
    } else {
        alert("Поле не заполнено"); 
    }
}


function saveToStorage(todo) {
    const todos = JSON.parse(localStorage.getItem('tasks')) || [];
  
    localStorage.setItem('tasks', JSON.stringify([...todos, todo]));
}
  
function removeFromStorage(removedTodo) {
    const todos = JSON.parse(localStorage.getItem('tasks')) || [];

    localStorage.setItem(
        'tasks',
        JSON.stringify(todos.filter((todo) => todo !== removedTodo))
    );
}
  
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('tasks'));

    if (todos) {
        todos.forEach(todo => createTodo(todo));
    }
}


function createTodo (text) {
    const li = document.createElement('li');
    const btnRemove = document.createElement('button');
    li.innerText = text; 
    li.className = 'todo-item'; 

    btnRemove.className = 'btn-remove';
    btnRemove.innerText = '-';
    btnRemove.addEventListener('click', removeTodo); 

    list.append(li, btnRemove);
}

function removeTodo () { 
    this.removeEventListener('click', removeTodo);
    removeFromStorage(this.previousElementSibling.innerText);
    const liRemove = this.previousElementSibling;
    this.remove(); 
    liRemove.remove();
}
