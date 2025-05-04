class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
  }
  open() {
    this._popupElement.classList.add("popup_visible");
  }
  close() {
    this._popupElement.classList.remove("popup_visible");
  }
  setEventListeners() {
    this._popupCloseBtn.addEventListener("click", (evt) => {
      this.close();
    });

    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
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
