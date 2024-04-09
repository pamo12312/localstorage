const input = document.getElementById('todo-input');
const pointsInput = document.getElementById('points-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const savedTodos = getTodosFromLocalStorage();
savedTodos.forEach(todo => {
    const listItem = createTodoElement(todo.text, todo.points, todo.date);
    if (todo.date === getCurrentDate()) {
        todoList.appendChild(listItem);
    }
});
addButton.addEventListener('click', function () {
    const todoText = input.value;
    const points = pointsInput.value;
    const date = getCurrentDate();
    const listItem = createTodoElement(todoText, points, date);
    todoList.appendChild(listItem);
    updateLocalStorage();
});
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = (month < 10) ? '0' + month : month;
    day = (day < 10) ? '0' + day : day;
    return `${year}-${month}-${day}`;
}
function createTodoElement(todoText, points, date) {
    const listItem = document.createElement('div');
    const todoSpan = document.createElement('span');
    todoSpan.classList.add('todo-text');
    const pointsSpan = document.createElement('span');
    pointsSpan.classList.add('todo-points');
    const dateSpan = document.createElement('span');
    dateSpan.classList.add('todo-date');
    const deleteButton = document.createElement('button');
    todoSpan.textContent = todoText;
    pointsSpan.textContent = `Points: ${points}`;
    dateSpan.textContent = `Completion Date: ${date}`;
    deleteButton.textContent = 'Delete';
    listItem.appendChild(todoSpan);
    listItem.appendChild(pointsSpan);
    listItem.appendChild(dateSpan);
    listItem.appendChild(deleteButton);
    deleteButton.addEventListener('click', function () {
        listItem.remove();
        updateLocalStorage();
    });


    return listItem;
}
function getTodosFromLocalStorage() {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? savedTodos.split(';').map(todo => {
        const [text, points, date] = todo.split(',');
        return { text, points, date };
    }) : [];
}

function updateLocalStorage() {
    const todoItems = document.querySelectorAll('#todo-list div');
    const todos = [];
    todoItems.forEach((item) => {
        const todoText = item.querySelector('.todo-text').textContent;
        const points = item.querySelector('.todo-points').textContent.replace('Points: ', '');
        const date = item.querySelector('.todo-date').textContent.replace('Completion Date: ', '');
        todos.push(`${todoText},${points},${date}`);
    });
    localStorage.setItem('todos', todos.join(';'));
}
