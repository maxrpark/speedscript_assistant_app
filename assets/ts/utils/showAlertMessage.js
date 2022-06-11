import { ref } from 'speedscript';
import { isEditing } from '../todo.js';
const showAlert = ref('alert-box');
const alertText = ref('alert-text');
let timeOut;
const showAlertMessage = (msg, type) => {
    alertText.ref.innerText = msg;
    showAlert.ref.className = ''; // edit class
    showAlert.ref.classList.add('alert-box', 'show', `${type}`);
    clearTimeout(timeOut);
    if (!isEditing) {
        timeOut = window.setTimeout(() => {
            showAlert.ref.classList.remove('show', `${type}`);
        }, 1500);
    }
};
export default showAlertMessage;
