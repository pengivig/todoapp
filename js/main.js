const taskForm = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('ul');
const emptyLi = document.querySelector('#emptyList');

let tasks = [];

if(localStorage.getItem('tasks')){
   tasks = JSON.parse(localStorage.getItem('tasks'));
   tasks.forEach(function(task){
      renderTask(task);
     })
}



checkEmptyList()

taskForm.addEventListener('submit', addTask);

taskList.addEventListener('click', deleteTask);

taskList.addEventListener('click', doTask);

function addTask(event) {
      
   const newTask = {
      id: Date.now(),
      title: taskInput.value,
      done: false
   }

   tasks.push(newTask);
   console.log(tasks);

   renderTask(newTask);
   
   saveToLocalStorage();
   
   taskInput.value = '';

   taskInput.focus(); 
   
   checkEmptyList();
}

function deleteTask(event){
   if(event.target.dataset.action === 'delete'){
      const parentNode = event.target.closest('li')
      const id = parentNode.id;
      parentNode.remove();

      const index = tasks.findIndex(function(task){
         console.log(task);
         if (task.id == id){
            return true;
         }
      })
      tasks.splice(index, 1)
      saveToLocalStorage();
   }
   
   checkEmptyList();
}

function doTask(event){
   
   if(event.target.dataset.action === 'done'){
   const parentNode = event.target.closest('li');
   const id = parentNode.id;
   const index = tasks.findIndex((task) => task.id == id)
   tasks[index].done = !tasks[index].done;
   parentNode.querySelector('.task-title').classList.toggle('task-title--done');
   saveToLocalStorage();
  }
 
}

function checkEmptyList(){
   if(tasks.length == 0){
      emptyLi.classList.remove('none')
   } else {
      emptyLi.classList.add('none')
   }
}

function saveToLocalStorage(){
   localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task){
        
   const classCss = task.done ? "task-title task-title--done" : "task-title" 

   const liHTML = `<li id = "${task.id}" class="list-group-item d-flex justify-content-between task-item">
   <span class="${classCss}">${task.title}</span>
   <div class="task-item__buttons">
      <button type="button" data-action="done" class="btn-action">
         <img src="./img/tick.svg" alt="Done" width="18" height="18">
      </button>
      <button type="button" data-action="delete" class="btn-action">
         <img src="./img/cross.svg" alt="Done" width="18" height="18">
      </button>
   </div>
</li>`;
taskList.insertAdjacentHTML('beforeend', liHTML);
}