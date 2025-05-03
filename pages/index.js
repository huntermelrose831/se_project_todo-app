import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template");
    return todo.getView();
  },
  containerSelector: ".todos__list",
});
section.renderItems();

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const generateTodo = (formattedData) => {
  const todo = new Todo(formattedData, "#todo-template");
  return todo.getView();
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.prepend(todo);
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopupEl);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopupEl);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const id = uuidv4();
  const values = { name, date: dateInput, id };

  renderTodo(values);

  closeModal(addTodoPopupEl);
  addTodoForm.reset();
  newTodoValidator.resetValidation();
});

//initialTodos.forEach((item) => {
//renderTodo(item);
//});
