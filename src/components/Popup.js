export default class Popup {

    #popup;

    constructor(selector) {
        this.#popup = document.querySelector(selector);
        this.#handleEscPress = this.#handleEscPress.bind(this);
    }

    #handleEscPress(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    open() {
        this.#popup.classList.add("popup_opened");
        document.addEventListener("keydown", this.#handleEscPress);
    }

    close() {
        this.#popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this.#handleEscPress);
    }

    #setEventListeners() {
        this.#popup.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__button-close")) {
                this.close();
            }
        });
    }
}