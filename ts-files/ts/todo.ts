import { ref } from 'speedscript';
import showYear from './utils/showYear.js';
showYear();
import renderList from './utils/renderList.js';
import showAlertMessage from './utils/showAlertMessage.js';

export let isEditing: boolean = false;
export let todoList: singleTask[];

const InputText = ref('InputText');
const todoContainer = ref('todoContainer');
const removeItems = ref('removeAll');
const form = ref('form');

// Listen event
// const form = document.getElementById('form')! as HTMLFormElement;

// variables
const textValue = InputText;
let taskID: string | undefined;

interface Task {
  id: string;
  value: string;
}

class singleTask {
  id: string;
  value: string;
  constructor(id: string, value: string) {
    this.id = id;
    this.value = value;
  }
}

// Create localStorage
if (localStorage.getItem('TSTodoList')) {
  todoList = JSON.parse(localStorage.getItem('TSTodoList')!);
  renderList();
} else {
  todoList = [];
  localStorage.setItem('TSTodoList', JSON.stringify(todoList));
}

form.onSubmitPrevent(() => {
  if (
    (textValue.ref as HTMLInputElement).value &&
    (textValue.ref as HTMLInputElement).value.trim() !== ''
  ) {
    if (isEditing) {
      todoList.map((task: Task) => {
        if (task.id === taskID) {
          task.value = (textValue.ref as HTMLInputElement).value;
        }
      });
      (textValue.ref as HTMLInputElement).value = '';
      isEditing = false;
      showAlertMessage('Edited', 'success');
    } else {
      let newTask = new singleTask(
        new Date().getTime().toString(),
        (textValue.ref as HTMLInputElement).value
      );
      todoList.push(newTask);
      (textValue.ref as HTMLInputElement).value = '';
      showAlertMessage('Task created', 'success');
    }
  } else {
    showAlertMessage('Please enter a task', 'danger');
  }
  renderList();
});

// Remove items
removeItems.onClick(() => {
  todoContainer.ref!.innerHTML = ''; // check this later
  todoList = [];
  removeItems.ref.style.display = 'none';
  showAlertMessage('All Tasks Deleted', 'danger');
  renderList(); // to clear local storage
});

// Task options

todoContainer.onClick((e: Event) => {
  let target = e.target! as HTMLElement;
  (textValue.ref! as HTMLInputElement).value = '';
  isEditing = false;
  taskID = (target.parentElement!.parentElement as HTMLElement).dataset.id;

  // Complete task
  if (target.classList.contains('completeItem')) {
    target.parentElement!.parentElement!.classList.toggle('isComplete');
  } else {
    // Edit task
    if (target.classList.contains('editItem')) {
      isEditing = true;
      todoList.map((task: Task) => {
        if (task.id === taskID) {
          (textValue.ref as HTMLInputElement).value = task.value;
        }
      });
      showAlertMessage('Editing', 'warning');
    }
    // Delete Task;
    else if (target.classList.contains('deleteItem')) {
      todoList = todoList.filter((task: Task) => task.id !== taskID);
      renderList();
      showAlertMessage('Task Deleted', 'danger');
    }
  }
});
