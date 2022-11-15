const list = document.getElementById('todos'); //получаем со страницы элемент ul по id todos
document.querySelector('button').addEventListener('click', handleClick); //вешаем обработчик на кнопку

function handleClick() { //ф-ция по обработке кнопки
    const newTodo = this.previousElementSibling.value.trim(); //this ссылается на тот элемент, на который кликнули, т.е. newTodo получит предыдущий соседний элемент тоносительно кнопки (значения из input)

    if (newTodo) { 
        createTodo(newTodo);
        this.previousElementSibling.value = ''; //очистка input после добавления задачи
    } else {
        alert("Поле не заполнено"); //сообщение об ошибке
    }
}

function createTodo (text) {//ф-ция создания нового элемента
    const li = document.createElement('li'); //создание элемента с тегом li
    const btnRemove = document.createElement('button');
    li.innerText = text; 
    li.className = 'todo-item'; //добавление класса к создаваемому элементу

    btnRemove.className = 'btn-remove';
    btnRemove.innerText = '-';
    btnRemove.addEventListener('click', removeTodo); //обработчик для удаления элемента из списка по клику

    list.append(li, btnRemove); //добавдение созданного тега li со всем наполнением к элементу list 
    //list.prepend(li); 
}

function removeTodo () { //ф-ция очистки списка по клику
    this.removeEventListener('click', removeTodo); //снимает обработчик событий с конкретного элемента
    const liRemove = this.previousElementSibling;
    this.remove(); //удаление из списка конкретной задачи по клику при помощи метода remove
    liRemove.remove();
}
