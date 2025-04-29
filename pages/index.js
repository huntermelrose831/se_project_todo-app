import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const formatDateString = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return `Due: ${date.toLocaleDateString("en-US", options)}`;
};

const generateTodo = (data) => {
  const formattedData = {
    ...data,
    date: formatDateString(data.date),
  };
  const todo = new Todo(formattedData, "#todo-template");
  return todo.getView();
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
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

  closeModal(addTodoPopup);
  addTodoForm.reset();
  newTodoValidator.resetValidation();
});

initialTodos.forEach((item) => {
  renderTodo(item);
});
