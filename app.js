// Selectors
const formInput = document.querySelector('.form__input');
const formBtn = document.querySelector('.form__button');
const todoList = document.querySelector('.todo__list');
const filterOptions = document.querySelector('.form__select');

// Functions
const addTodo = (event) => {
  event.preventDefault();
  // create new list element
  const listEl = document.createElement('li');
  listEl.classList.add('list__item');
  // create paragraph in a list element
  const par = document.createElement('p');
  par.innerText = formInput.value;
  par.classList.add('item__text');
  listEl.appendChild(par);
  // create checkmark button in a list element
  const completeBtn = document.createElement('button');
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  completeBtn.classList.add('item__button--complete');
  listEl.appendChild(completeBtn);
  // create delete button in a list element
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.classList.add('item__button--delete');
  listEl.appendChild(deleteBtn);
  // append new element to the list
  todoList.appendChild(listEl);
  // clear user input value
  formInput.value = '';
};

const checkDeleteTask = (event) => {
  // choose task on which the event was envoked
  const item = event.target;
  // check task
  if(item.classList[0] === 'item__button--complete'){
    const task = item.parentElement;
    task.classList.toggle('completed');
  }
  // delete task
  if(item.classList[0] === 'item__button--delete'){
    const task = item.parentElement;
    // handle delete animation
    task.classList.add('fall');
    task.addEventListener('transitionend', () => {
      task.remove();
    })
  }


};

const filterTasks = (event) => {
  const taskList = todoList.childNodes;
  taskList.forEach((task) => {
    switch(event.target.value){
      case 'all':
        task.style.display = 'flex';
        break;
      case 'finished':
        if(task.classList.contains('completed')){
          task.style.display = 'flex';
        } else {
          task.style.display = 'none';
        }
        break;
      case 'not-finished':
        if(task.classList.contains('completed')){
          task.style.display = 'none';
        } else {
          task.style.display = 'flex';
        }
        break;
      };
    });
  };

// Event listeners
formBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', checkDeleteTask);
filterOptions.addEventListener('click', filterTasks);