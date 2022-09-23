export default class Card {

    #name;
    #link;
    #templateSelector;
    #element;

    constructor(item, templateSelector = '#templateElement') {
        this.#name = item.name;
        this.#link = item.link;
        this.#templateSelector = templateSelector;
    }


    // добавляем все слушатели карточки
    #setEventListeners() {
        this.#element.querySelector('.element__image').addEventListener('click', () => {
            this.#handleOpenPopup();
        });

        this.#element.querySelector('.element__trash-button').addEventListener('click', () => {
            this.#deleteElement();
        });

        this.#element.querySelector('.element__like-button').addEventListener('click', () => {
            this.#like();
        });
    }

    // находим темплейт и копируем его
    #getTemplate() {
        return document.querySelector(this.#templateSelector).content.querySelector('.element').cloneNode(true);
    }

    // попап картинки
    #handleOpenPopup() {
        const popupZoomImage = document.querySelector('.popup_type_zoom');
        const imageSrcAndAlt = popupZoomImage.querySelector('.popup__zoom-image');
        const imageCaption = popupZoomImage.querySelector('.popup__figure-caption');

        popupZoomImage.classList.add('popup_opened');

        imageSrcAndAlt.src = this.#link;
        imageSrcAndAlt.alt = this.#name;
        imageCaption.textContent = this.#name;
    }

    // удаление карточки
    #deleteElement() {
        this.#element.closest('li').remove();
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