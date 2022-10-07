export default class Popup {

    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector);
        this.handleEscClose = this.#handleEscClose.bind(this);
    }

    // функция для слушателя документа (закрытие по esc)
    #handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    // добавление общих обработчиков (закрытие по нажатию на фон и крестик)
    setEventListeners() {
        this.popup.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-button")) {
                this.close();
            }
        });
    }

    // отрктиые попапа и добавление слушателя на кнопку
    open() {
        this.popup.classList.add("popup_opened");
        document.addEventListener("keydown", this.handleEscClose);
    }

    // закрытие попапа и удаление слушателя на кнопку
    close() {
        this.popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
}