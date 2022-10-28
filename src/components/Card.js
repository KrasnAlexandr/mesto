export default class Card {
    #templateSelector;
    #element;

    #likes;
    #myId;
    #userIdOwner;
    #isMyCard;

    #handleCardClick;
    #handelOpenPopupConfirmation;
    #handleLikeCard;

    #cardTitle;
    #image;
    #likeButton;
    #likeCounter;
    #deleteButton;

    constructor(card, myId, templateSelector, handleCardClick, handelOpenPopupDeleteCard, handleLikeCard) {
        this.name = card.name;
        this.link = card.link;
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


    // добавляем все слушатели карточки или удаляем кнопку удаления
    #setEventListeners() {
        this.#image.addEventListener("click", () => {
            this.#handleCardClick(this);
        }); // зум

        if (!this.#isMyCard) {
            this.#deleteButton.remove();
            this.#deleteButton = null;
        } else {
            this.#deleteButton.addEventListener("click", () => {
                this.#handelOpenPopupConfirmation(this);
            }); // удаление, в случае, если картинка не моя, икнока удаления пропадает
        }

        this.#likeButton.addEventListener("click", () => {
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
        this.#likeButton.classList.add("element__like-button_type_active");
        this.#likeCounter.textContent = newValue;
        this.hasMyLike = true;
    }


    //дизлайк карточки
    dislikeThisCard(newValue) {
        this.#likeButton.classList.remove("element__like-button_type_active");
        this.#likeCounter.textContent = newValue;
        this.hasMyLike = false;
    }


    //публичный метод, создания карточки, используется в форме создания новой
    generateCard() {
        this.#element = this.#getTemplate();

        //ищу все необходимые элементы, для исключения дублирования поиска
        this.#cardTitle = this.#element.querySelector(".element__title");
        this.#image = this.#element.querySelector(".element__image");
        this.#likeButton = this.#element.querySelector(".element__like-button");
        this.#likeCounter = this.#element.querySelector(".element__like-counter");
        this.#deleteButton = this.#element.querySelector(".element__trash-button");

        this.#image.src = this.link;
        this.#image.alt = this.name;

        this.#cardTitle.textContent = this.name;
        this.#likeCounter.textContent = this.#likes.length;

        this.hasMyLike = this.#likes.some((like) => like._id === this.#myId);


        if (this.hasMyLike) {
            this.#likeButton.classList.add("element__like-button_type_active");
        }

        this.#setEventListeners(); // добавить все слушатели карточке

        return this.#element; // вернуть готовую карточку
    }
}