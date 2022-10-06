import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    #popupForm
    #inputList
    #handleFormSubmit
    #formValues

    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.#popupForm = this.popup.querySelector(".popup__form");
        this.#inputList = this.#popupForm.querySelectorAll(".popup__input");
        this.#handleFormSubmit = handleFormSubmit;
    }

    #getInputValues() {
        this.#formValues = {};
        this.#inputList.forEach(input => {
            this.#formValues[input.name] = input.value
        });
        return this.#formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this.popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.#handleFormSubmit(this.#getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this.#popupForm.reset();
    }
}