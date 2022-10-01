export default class Card {

    #name;
    #link;
    #templateSelector;
    #element;
    #handleOpenPopupZoom;

    constructor({ name, link }, templateSelector, handleOpenPopupZoom) {
        this.#name = name;
        this.#link = link;
        this.#templateSelector = templateSelector;
        this.#handleOpenPopupZoom = handleOpenPopupZoom;
    }


    // добавляем все слушатели карточки
    #setEventListeners() {
        this.#element.querySelector('.element__image').addEventListener('click', () => {
            this.#handleOpenPopupZoom({ name: this.#name, link: this.#link });
        }); // зум

        this.#element.querySelector('.element__trash-button').addEventListener('click', () => {
            this.#deleteElement();
        }); // удаление

        this.#element.querySelector('.element__like-button').addEventListener('click', () => {
            this.#like();
        }); // лайк
    }

    // находим темплейт и копируем его
    #getTemplate() {
        return document.querySelector(this.#templateSelector).content.querySelector('.element').cloneNode(true);
    }

    // удаление карточки
    #deleteElement() {
        this.#element.remove();
    }

    // лайк для карточки
    #like() {
        this.#element.querySelector('.element__like-button').classList.toggle('element__like-button_type_active');
    }


    //публичный метод, создания карточки, используется в форме создания новой
    generateCard() {
        this.#element = this.#getTemplate();

        const elementImage = this.#element.querySelector('.element__image');
        elementImage.src = this.#link;
        elementImage.alt = this.#name;

        this.#element.querySelector('.element__title').textContent = this.#name;

        this.#setEventListeners();

        return this.#element;
    }
}