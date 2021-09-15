let addMessage = document.querySelector ('.task-text');
let addButton = document.querySelector ('.add');
let todo = document.querySelector ('.list');

let todoList = [];

if(localStorage.getItem('todo')){
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayMessages();
};


addButton.addEventListener('click', function (){
  if (!addMessage.value) return;
  let newToDo = {
    todo : addMessage.value,
    checked : false,
    important : false,
  }

  todoList.push(newToDo);
  displayMessages();
  localStorage.setItem('todo', JSON.stringify(todoList));
  addMessage.value='';
  //console.log(todoList);
}
)

function displayMessages(){
  let displayMessage = '';
  if (todoList.length===0) todo.innerHTML = '';
  todoList.forEach (function(item, i){
    displayMessage += `
    <li class="list__item">
      <input type='checkbox' id='item_${i}' ${item.checked?'checked':''}>
      <label for='item_${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
    </li>
    `;
    todo.innerHTML = displayMessage;
    displayMessage;
  });
}

todo.addEventListener('change', function(event){
  //let idInput = event.target.getAttribute('id');
  //let forLabel = todo.querySelector('[for=' + idInput + ']');
  let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;
  todoList.forEach(function(item){
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  })
});
todo.addEventListener('contextmenu', function (event){
  event.preventDefault ();
  todoList.forEach(function(item, i){
    if(item.todo === event.target.innerHTML){
      if (event.ctrlKey || event.metaKey){
        todoList.splice (i, 1);
      } else {
        item.important=!item.important;
      }
      displayMessages();
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  })
});