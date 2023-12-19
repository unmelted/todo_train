
const todo_local = localStorage.getItem('todoList');
const finished_local = localStorage.getItem('finishedList');

let todoItem = todo_local ? JSON.parse(todo_local) : [];
let finishedItem = finished_local ? JSON.parse(finished_local) : [];

const todoAddBtn = document.getElementById('add-btn');
const addTodo = () => {
    const todoInput = document.getElementById('new-todo');
    const todo = todoInput.value;
    if (todo) {
        todoItem.push({todo : todo, date : Date.now()});
        localStorage.setItem('todoList', JSON.stringify(todoItem));
        todoInput.value = '';
        renderTodo();
    }
}

const modifyTodo = (todo) => {

}

const finishClick = (todo) => {   
    let todoItemList = JSON.parse(localStorage.getItem('todoList'));
    let finishedItemList = localStorage.getItem('finishedList')
        ? JSON.parse(localStorage.getItem('finishedList'))
        : [];

    let nowTodoItemList = todoItemList.filter((elm) => elm.date !== todo.date);
    finishedItemList.push(todo);
    localStorage.setItem('todoList', JSON.stringify(nowTodoItemList));
    localStorage.setItem('finishedList', JSON.stringify(finishedItemList));
    renderTodo();
}

const deleteClick = (todo) => {
    console.log('delete!', todo);
    let finishedTodoList = JSON.parse(localStorage.getItem('finishedList'));
    let nowFinishedTodoList = finishedTodoList.filter((elm) => elm.date !== todo.date);
    localStorage.setItem('finishedList', JSON.stringify(nowFinishedTodoList));
    renderTodo();
}


const renderTodo = () => {
    const mainElement = document.getElementById('app');

    const todoListElement = document.querySelector('.todo-list');
    const finishedListElement = document.querySelector('.finished-list');
    todoListElement.innerHTML = '';
    finishedListElement.innerHTML = '';

    let todoItem = localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : [];
    let finishedItem = localStorage.getItem('finishedList') ? JSON.parse(localStorage.getItem('finishedList')) : [];


    console.log('renderTodo 1', todoItem);
    console.log('renderTodo 2', todoItem);    
    // let todoList = document.createElement('div');
    // todoList.classList.add('todo-list');
    // let finishedList = document.createElement('div');
    // finishedList.classList.add('finished-list');

    // mainElement.appendChild(todoList);
    // mainElement.appendChild(finishedList);

    todoItem.forEach((item, index) => {
        let todoListElement = document.querySelector('div.todo-list');
        let todoItemElement = document.createElement('div');
        todoItemElement.classList.add('todo-item');
        todoItemElement.id = item.date;

        let todoContentElement = document.createElement('div');
        todoContentElement.classList.add('todo-content');
        todoContentElement.textContent = `${index +1} : ${item.todo}`;
        todoContentElement.addEventListener('click', () => modifyTodo(item));

        let finishBtn = document.createElement('button');
        finishBtn.id = 'finish-btn';
        finishBtn.textContent = '종료';
        finishBtn.addEventListener('click', () => finishClick(item));

        todoListElement.appendChild(todoItemElement);
        todoItemElement.appendChild(todoContentElement);
        todoItemElement.appendChild(finishBtn);

    });

    finishedItem.forEach((item, index) => {
        let finishedListElement = document.querySelector('div.finished-list');
        let finishedItemElement = document.createElement('div');
        finishedItemElement.classList.add('finished-item');
        finishedItemElement.id = item.date;

        let finishedContentElement = document.createElement('div');
        finishedContentElement.classList.add('finished-content');
        finishedContentElement.textContent = `${index +1} : ${item.todo}`;
        let delBtn = document.createElement('button');
        delBtn.id = 'del-btn';
        delBtn.textContent = '삭제';
        delBtn.addEventListener('click', () => deleteClick(item));

        finishedListElement.appendChild(finishedItemElement);
        finishedItemElement.appendChild(finishedContentElement);
        finishedItemElement.appendChild(delBtn);
    });
}

todoAddBtn.addEventListener('click', addTodo);
renderTodo();