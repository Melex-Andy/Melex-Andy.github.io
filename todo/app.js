const list = document.getElementById('todos'); 
document.querySelector('button').addEventListener('click', handleClick); 

function handleClick() { 
    const newTodo = this.previousElementSibling.value.trim(); 

    if (newTodo) { 
        createTodo(newTodo);
        this.previousElementSibling.value = ''; 
    } else {
        alert("Поле не заполнено"); 
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
    const liRemove = this.previousElementSibling;
    this.remove(); 
    liRemove.remove();
}
