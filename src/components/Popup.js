export default class Popup {

    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector);
        this.handleEscClose = this.#handleEscClose.bind(this);
    }

    #handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this.popup.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-button")) {
                this.close();
            }
        });
    }

    open() {
        this.popup.classList.add("popup_opened");
        document.addEventListener("keydown", this.handleEscClose);
    }

    close() {
        this.popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
}