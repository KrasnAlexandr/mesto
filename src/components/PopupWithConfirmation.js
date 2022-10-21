import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {

    #popupForm;
    #handleFormSubmit;
    #item;
    #submitButton;
    #defaultText;

    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.#popupForm = this.popup.querySelector(".popup__form");

        this.#handleFormSubmit = handleFormSubmit;
        this.#submitButton = this.#popupForm.querySelector(".popup__submit-button");
        this.#defaultText = this.#submitButton.textContent;
    }

    open(item) {
        super.open();
        this.#item = item;
    }

    setEventListeners() {
        super.setEventListeners();
        this.popup.addEventListener("submit", (evt) => {
            evt.preventDefault();

            this.#handleFormSubmit(this.#item)
        });
    }

    // ux кнопки
    renderLoading(isLoading) {
        if (isLoading) {
            this.#submitButton.textContent = "Удаление...";
        } else {
            this.#submitButton.textContent = this.#defaultText;
        }
    }
}