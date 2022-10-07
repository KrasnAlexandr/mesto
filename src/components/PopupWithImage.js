import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

    #popupImageLink;
    #popupImageTitle;

    constructor(popupSelector) {
        super(popupSelector);
        this.#popupImageLink = this.popup.querySelector(".popup__zoom-image");
        this.#popupImageTitle = this.popup.querySelector(".popup__figure-caption");
    }

    // расширяет родительский метод и передает ссылку и название картинки в попап (важно отслеживать name инпутов)
    open({ name, link }) {
        this.#popupImageLink.src = link;

        this.#popupImageTitle.textContent = name;
        this.#popupImageLink.alt = name;

        super.open();
    }
}