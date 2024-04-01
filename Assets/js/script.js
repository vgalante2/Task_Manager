const taskForm = document.querySelector('#taskForm')
const submitBtn = document.querySelector('#taskSubmit')
const formOutput = document.querySelector('.card-body')
const formModal = document.querySelector('#formModal')
const draggable = document.querySelectorAll('#draggable')
const container = document.querySelector('.card-body')

function getTask(taskObj) {
    taskObj.preventDefault()


    const taskName = taskForm.title.value
    const taskDate = taskForm.date.value
    const taskDescription = taskForm.description.value



  let formArray = JSON.parse(localStorage.getItem('taskForm')) || []

   
    formObj = {
        name: taskName,
        date: taskDate,
        description: taskDescription
    }

    formArray.push(formObj)

    
    localStorage.setItem('taskForm', JSON.stringify(formArray))

    console.log(formArray)

    let modalElement = document.querySelector('#formModal');
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();

    modalElement.addEventListener('hidden.bs.modal', function () {
        // Refresh the page
        location.reload();
    });
    
}

const form = JSON.parse(localStorage.getItem('taskForm')) || []

function outputTask() {

    if(form.length) {
    formOutput.innerHTML = ''
  }
  
  for (let taskObj of form) {
    formOutput.insertAdjacentHTML('beforeend', 
    `
      <div class=" draggable parentDiv row align-center border border-dark p-3 rounded-3" draggable="true" style="background-color: #FFCCCC;">
       <h3> ${taskObj.name} </h3>
       <h5> ${taskObj.date} </h5>
       <p> ${taskObj.description} </p>
       <button class="delete-btn rounded-pill" style="border: none; background-color: white; color: black;" >Delete</button>
      </div>
    `)
  }

    
}

outputTask()

function setupDragAndDrop() {
    // Setting up the drag start event for all draggable items
    document.querySelectorAll('.draggable').forEach(draggable => {
        draggable.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text', e.target.getAttribute('data-task-id')); // Assuming each task has a data-task-id attribute
        });
    });

    // Enabling each .card-body container to be a drop zone
    document.querySelectorAll('.card-body').forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault(); // Necessary to allow dropping
        });

        container.addEventListener('drop', e => {
            e.preventDefault();
            const taskId = e.dataTransfer.getData('text');
            const task = document.querySelector(`[data-task-id="${taskId}"]`);
            if(task) {
                container.appendChild(task); // Move the task to the new container
            }
        });
    });
}


function init() {

taskForm.addEventListener('submit', getTask)



// DELETING TASKS

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
      const taskContainer = event.target.closest('.parentDiv');
      if (taskContainer) {

        taskContainer.remove();
        localStorage.setItem('taskForm', JSON.stringify(form))
      }
    }
  });
}



document.addEventListener('DOMContentLoaded', init);

