import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup.js";
import TodoCounter from "../components/TodoCounter.js";
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}
function handleDelete(completed) {
  todoCounter.updateTotal(false);
}

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (evt) => {
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;

    const id = uuidv4();
    const values = { name, date: dateInput, id };

    renderTodo(values);

    addTodoPopup.close();
    addTodoForm.reset();
    newTodoValidator.resetValidation();
  },
});

addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template", handleCheck, handleDelete);
    return todo.getView();
  },
  containerSelector: ".todos__list",
});
section.renderItems();

const generateTodo = (formattedData) => {
  const todo = new Todo(
    formattedData,
    "#todo-template",
    handleCheck,
    handleDelete
  );
  return todo.getView();
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.prepend(todo);
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopup.close();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
