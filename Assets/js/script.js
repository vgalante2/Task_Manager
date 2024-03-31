const btn = document.querySelector('#task-btn')
const modal = document.querySelector('#modal')

function addTask() {
    modal.classList.add('active')
}











function init() {
btn.addEventListener('click', addTask)
}


init()