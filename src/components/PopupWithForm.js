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

    // метод по сбору данных со всех ипнутов формы и создании объекта из собраных данных (возвращает объект)
    #getInputValues() {
        this.#formValues = {};

        this.#inputList.forEach(input => this.#formValues[input.name] = input.value);

        return this.#formValues;
    }

    // расширение родительского слушателя, добавляет --> сброс обновления страницы, обработку собраных даных, закрытие попапа
    setEventListeners() {
        super.setEventListeners();
        this.popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.#handleFormSubmit(this.#getInputValues());
            this.close();
        });
    }

    // расширение родительского метода --> сбрасывает инпуты формы
    close() {
        super.close();
        this.#popupForm.reset();
    }
}