// import { ref } from '../../node_modules/speedscript/lib/index.js';
let { ref } = require('speedscript');
import showYear from './utils/showYear.js';
showYear();
import renderList from './utils/renderList.js';
import showAlertMessage from './utils/showAlertMessage.js';
export let isEditing = false;
export let todoList;
const InputText = ref('InputText');
const todoContainer = ref('todoContainer');
const removeItems = ref('removeAll');
const form = ref('form');
// Listen event
// const form = document.getElementById('form')! as HTMLFormElement;
// variables
const textValue = InputText;
let taskID;
class singleTask {
    constructor(id, value) {
        this.id = id;
        this.value = value;
    }
}
// Create localStorage
if (localStorage.getItem('TSTodoList')) {
    todoList = JSON.parse(localStorage.getItem('TSTodoList'));
    renderList();
}
else {
    todoList = [];
    localStorage.setItem('TSTodoList', JSON.stringify(todoList));
}
form.onSubmitPrevent(() => {
    if (textValue.ref.value &&
        textValue.ref.value.trim() !== '') {
        if (isEditing) {
            todoList.map((task) => {
                if (task.id === taskID) {
                    task.value = textValue.ref.value;
                }
            });
            textValue.ref.value = '';
            isEditing = false;
            showAlertMessage('Edited', 'success');
        }
        else {
            let newTask = new singleTask(new Date().getTime().toString(), textValue.ref.value);
            todoList.push(newTask);
            textValue.ref.value = '';
            showAlertMessage('Task created', 'success');
        }
    }
    else {
        showAlertMessage('Please enter a task', 'danger');
    }
    renderList();
});
// Remove items
removeItems.onClick(() => {
    todoContainer.ref.innerHTML = ''; // check this later
    todoList = [];
    removeItems.ref.style.display = 'none';
    showAlertMessage('All Tasks Deleted', 'danger');
    renderList(); // to clear local storage
});
// Task options
todoContainer.onClick((e) => {
    let target = e.target;
    textValue.ref.value = '';
    isEditing = false;
    taskID = target.parentElement.parentElement.dataset.id;
    // Complete task
    if (target.classList.contains('completeItem')) {
        target.parentElement.parentElement.classList.toggle('isComplete');
    }
    else {
        // Edit task
        if (target.classList.contains('editItem')) {
            isEditing = true;
            todoList.map((task) => {
                if (task.id === taskID) {
                    textValue.ref.value = task.value;
                }
            });
            showAlertMessage('Editing', 'warning');
        }
        // Delete Task;
        else if (target.classList.contains('deleteItem')) {
            todoList = todoList.filter((task) => task.id !== taskID);
            renderList();
            showAlertMessage('Task Deleted', 'danger');
        }
    }
});
