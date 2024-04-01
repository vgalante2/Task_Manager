const taskForm = document.querySelector('#taskForm')
const submitBtn = document.querySelector('#taskSubmit')
const formOutput = document.querySelector('.card-body')
const formModal = document.querySelector('#formModal')



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
      <div class=" item parentDiv row align-center border border-dark p-3 rounded-3" draggable="true" style="background-color: #FFCCCC;">
       <h3> ${taskObj.name} </h3>
       <h5> ${taskObj.date} </h5>
       <p> ${taskObj.description} </p>
       <button class="delete-btn rounded-pill" style="border: none; background-color: white; color: black;" >Delete</button>
      </div>
    `)
  }

    
}

outputTask()



// DRAG AND DROP FUNCTIONS

function setupDrag(els) {
 els.draggable({
    opacity: 0.7,
    zIndex: 100,
 })
}

function setupDrop() {
    $('.item, .card-body' ).droppable({
        accept: '.item', 
        // The class of the items being dragged
        drop: function (eventObj, ui) {
            $(this).append(ui.draggable)
            ui.draggable.css({
                top: "auto",
                left: "auto"
            })
        }
    })
}


setupDrag($('.item'))
setupDrop()



// INIT

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

