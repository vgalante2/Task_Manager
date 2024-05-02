
// const - FORM ITEMS
const taskForm = $('#taskForm');
const submitBtn = $('#taskSubmit');
const formOutput = $('#todo-cards');
const formModal = $('#formModal');



function getTask(e) {
    // Prevent the submit button from defaulting
    e.preventDefault();

    // declare the form values
    const taskName = $('input[name="title"]', taskForm).val();
    const taskDate = $('input[name="date"]', taskForm).val();
    const taskDescription = $('textarea[name="description"]', taskForm).val();

    // parse the new array into localStorage
    let formArray = JSON.parse(localStorage.getItem('taskForm')) || [];

    // create a form Obj
    let formObj = {
        id: Date.now(),
        name: taskName,
        date: taskDate,
        description: taskDescription
    };

    // Push the object onto the array
    formArray.push(formObj);

    // set the localstorage variable and stringify
    localStorage.setItem('taskForm', JSON.stringify(formArray));

    console.log(formArray);

    // Get modal instance through bootstrap
    let modalInstance = bootstrap.Modal.getInstance(formModal[0]); // jQuery object to DOM element
    modalInstance.hide();

    // When the modal is hidden
    formModal.on('hidden.bs.modal', function () {
        location.reload();
    });
}

// Output the form Data
function outputTask() {
    // declare the form and parse into localstorage
    const form = JSON.parse(localStorage.getItem('taskForm')) || [];

    // if theres no from then output nothing
    if (form.length) {
        formOutput.html('');
    }

    // append each form element into an html div
    $.each(form, function(index, taskObj) {
        formOutput.append(`
            <div class="item parentDiv row align-center border border-dark p-3 rounded-3" draggable="true" style="background-color: #FFCCCC;">
                <h3> ${taskObj.name} </h3>
                <h5> ${taskObj.date} </h5>
                <p> ${taskObj.description} </p>
                <button class="delete-btn rounded-pill" style="border: none; background-color: white; color: black;" >Delete</button>
            </div>
        `);
    });

    
    
}


// Make each item draggable 
function setupDrag() {
    $('.item').draggable({
        opacity: 0.7,
        zIndex: 100,
    });
}

// Make each item droppable
function setupDrop() {
    $('.item, .card-body').droppable({
        accept: '.item',
        drop: function (event, ui) {
            // if(this.droppable) {
            //     if (this.hasId('to do')) {
            //         this
            //     }
            // }
            $(this).append(ui.draggable.css({
                top: "auto",
                left: "auto"
            }));
        }
    });
}



// Initialize the app
function init() {
  taskForm.on('submit', getTask);


//   Delete a task
  $(document).on('click', '.delete-btn', function() {
    const taskContainer = $(this).closest('.parentDiv');
    const taskId = taskContainer.data('task-id'); // Get the task's ID

    // Remove the task from DOM
    taskContainer.remove();

    // Remove the task from localStorage
    let tasks = JSON.parse(localStorage.getItem('taskForm')) || [];
    tasks = tasks.filter(task => task.id !== taskId); // Filter out the task to be deleted
    localStorage.setItem('taskForm', JSON.stringify(tasks)); // Update localStorage
});

    setupDrag();
    setupDrop();
}

$(document).ready(function() {
    outputTask();
    init();
});
