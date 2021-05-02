

const fromUI = document.querySelector('form');

const taskUI = document.querySelector('#task');

const listTasks = document.querySelector('#listTasks');


localStorage.setItem('token', JSON.stringify(['ashwag', 'abdo', 'omar']))


console.log(JSON.parse(localStorage.getItem('token')));

// get tasks from Localstorage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) ?? [];
}



fromUI.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!taskUI.value) {
        alert('please enter the task')
        return;
    }

    const tasks = getTasks();

    tasks.push(taskUI.value);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    addTaskToTasksListUI(taskUI.value);

    taskUI.value = '';

    alert('task added');

});

// load all the tanks from the localstorage.
loadTasks();

function loadTasks() {

    getTasks().forEach(task => {

        addTaskToTasksListUI(task);
    });

}


function addTaskToTasksListUI(task) {

    const liElement = document.createElement('li')

    const deleteElement = document.createElement('span');

    deleteElement.style.marginLeft = "50px";
    deleteElement.style.cursor = "pointer";
    deleteElement.classList.add('delete');

    deleteElement.appendChild(
        document.createTextNode('x')
    )

    liElement.appendChild(
        document.createTextNode(task)
    )

    liElement.appendChild(
        deleteElement
    )

    listTasks.appendChild(liElement)

}



listTasks.addEventListener('click', function (e) {

    if (e.target.className.includes('delete')) {

        e.target.parentElement.remove();

        const filteredTasks = getTasks().filter(function (element) {
            return element != e.target.previousSibling.textContent;
        });


        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    }
});
