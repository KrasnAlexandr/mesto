import Card from "../components/Card.js"; // класс карточек
import { popupWithImage, api, popupWithConfirmation } from "../pages/index.js";

const handleCardClick = item => {
    popupWithImage.open(item);
}; // функция для открытия попапа картинки (передается в конструктор)


const handelOpenPopupDeleteCard = card => {
    popupWithConfirmation.open(card);
} // функция для открытия попапа удаления карточки (принимает на вход весь this)


const handleLikeCard = (card) => {
    if (card.hasMyLike) {
        api.dislikeThisCard(card.cardId)
            .then((res) => {
                card.dislikeThisCard(res.likes.length);
            })
            .catch(err => console.error(err));

    } else {
        api.likeThisCard(card.cardId)
            .then((res) => {
                card.likeThisCard(res.likes.length);
            })
            .catch(err => console.error(err));
    }
}

export const createCard = (item, userId) => {
    const card = new Card(item, userId, '#templateElement', handleCardClick, handelOpenPopupDeleteCard, handleLikeCard);

    return card.generateCard();
}; //функция создания карточки