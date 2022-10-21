import { popupWithImage, api, popupWithConfirmation } from "../pages/index.js";

export const handleCardClick = card => {
    popupWithImage.open(card);
}; // функция для открытия попапа картинки (передается в конструктор)


export const handelOpenPopupDeleteCard = card => {
    popupWithConfirmation.open(card);
} // функция для открытия попапа удаления карточки (принимает на вход весь this)


export const handleLikeCard = (card) => {
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