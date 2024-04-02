const taskForm = $('#taskForm');
const submitBtn = $('#taskSubmit');
const formOutput = $('#todo-cards');
const formModal = $('#formModal');

function getTask(e) {
    e.preventDefault();

    const taskName = $('input[name="title"]', taskForm).val();
    const taskDate = $('input[name="date"]', taskForm).val();
    const taskDescription = $('textarea[name="description"]', taskForm).val();

    let formArray = JSON.parse(localStorage.getItem('taskForm')) || [];

    let formObj = {
        name: taskName,
        date: taskDate,
        description: taskDescription
    };

    formArray.push(formObj);

    localStorage.setItem('taskForm', JSON.stringify(formArray));

    console.log(formArray);

    let modalInstance = bootstrap.Modal.getInstance(formModal[0]); // jQuery object to DOM element
    modalInstance.hide();

    formModal.on('hidden.bs.modal', function () {
        location.reload();
    });
}

function outputTask() {
    const form = JSON.parse(localStorage.getItem('taskForm')) || [];

    if (form.length) {
        formOutput.html('');
    }

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



function setupDrag() {
    $('.item').draggable({
        opacity: 0.7,
        zIndex: 100,
    });
}

function setupDrop() {
    $('.item, .card-body').droppable({
        accept: '.item',
        drop: function (event, ui) {
            $(this).append(ui.draggable.css({
                top: "auto",
                left: "auto"
            }));
        }
    });
}

function init() {
  taskForm.off('submit').on('submit', getTask);


    $(document).on('click', '.delete-btn', function() {
        const taskContainer = $(this).closest('.parentDiv');
        taskContainer.remove();
        // Note: Here you would also need to update localStorage to reflect the deletion
    });

    setupDrag();
    setupDrop();
}

$(document).ready(function() {
    outputTask();
    init();
});
