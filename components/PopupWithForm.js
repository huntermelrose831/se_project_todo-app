import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values; // Add this line
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(evt);
      this._getInputValues();
    });
  }
}
export default PopupWithForm;
