export default class Card {

    #name;
    #link;
    #templateSelector;
    #element;
    #handleCardClick;
    #likes;
    #myId;
    #userIdOwner;
    #isMyCard;
    #handelOpenPopupConfirmation;
    #handleLikeCard;

    constructor(card, myId, templateSelector, handleCardClick, handelOpenPopupDeleteCard, handleLikeCard) {
        this.#name = card.name;
        this.#link = card.link;
        this.#templateSelector = templateSelector;

        this.#myId = myId;
        this.#userIdOwner = card.owner._id;

        this.#isMyCard = this.#myId === this.#userIdOwner;

        this.cardId = card._id;

        this.#likes = card.likes;

        this.#handleCardClick = handleCardClick; // функция для зума фото
        this.#handelOpenPopupConfirmation = handelOpenPopupDeleteCard; // попап открытия карточки
        this.#handleLikeCard = handleLikeCard; // функция для лайка карточки

    }


    // добавляем все слушатели карточки
    #setEventListeners() {
        this.#element.querySelector('.element__image').addEventListener("click", () => {
            this.#handleCardClick({ name: this.#name, link: this.#link });
        }); // зум

        if (!this.#isMyCard) {
            this.#element.querySelector('.element__trash-button').remove();
        } else {
            this.#element.querySelector('.element__trash-button').addEventListener("click", () => {
                this.#handelOpenPopupConfirmation(this);
            }); // удаление, в случае, если картинка не моя, икнока удаления пропадает
        }

        this.#element.querySelector('.element__like-button').addEventListener("click", () => {
            this.#handleLikeCard(this);
        }); // лайк
    }

    // находим темплейт и копируем его
    #getTemplate() {
        return document.querySelector(this.#templateSelector).content.querySelector(".element").cloneNode(true);
    }

    // удаление карточки
    deleteElement() {
        this.#element.remove();
        this.#element = null;
    }

    // лайк карточки
    likeThisCard(newValue) {
        this.#element.querySelector(".element__like-button").classList.add("element__like-button_type_active");
        this.#element.querySelector(".element__like-counter").textContent = newValue;
        this.hasMyLike = true;

    }


    //дизлайк карточки
    dislikeThisCard(newValue) {
        this.#element.querySelector(".element__like-button").classList.remove("element__like-button_type_active");
        this.#element.querySelector(".element__like-counter").textContent = newValue;
        this.hasMyLike = false;
    }


    //публичный метод, создания карточки, используется в форме создания новой
    generateCard() {
        this.#element = this.#getTemplate();


        const elementImage = this.#element.querySelector(".element__image");
        elementImage.src = this.#link;
        elementImage.alt = this.#name;


        this.#element.querySelector(".element__title").textContent = this.#name;
        this.#element.querySelector(".element__like-counter").textContent = this.#likes.length;


        this.hasMyLike = this.#likes.some((like) => like._id === this.#myId);


        if (this.hasMyLike) {
            this.#element.querySelector('.element__like-button').classList.add("element__like-button_type_active");
        }


        this.#setEventListeners(); // добавить все слушатели карточке
        return this.#element; // вернуть готовую карточку
    }
}