class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  setEventListeners() {
    this._popupCloseBtn.addEventListener("click", (evt) => {
      this.close();
    });

    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_visible")) {
        this.close();
      }
    });
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}
export default Popup;
