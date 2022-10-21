// импорты
import {
    addElementButton,
    cardForm,
    formProfile,
    jobInput,
    nameInput,
    params,
    profileEditButton,
    authorizationData,
    avatarEditButton,
    avatarForm,
} from "../utils/constants.js"; // константы

//import { createCard } from "../utils/utils.js"; // импорт универслаьной функции создания карточки
import Card from "../components/Card"; // класс карточек
import Section from "../components/Section.js"; // класс рендеринга
import FormValidator from "../components/FormValidator.js"; // класс валидации
import UserInfo from "../components/UserInfo"; // класс отвечающий за информацию профиля
import PopupWithImage from "../components/PopupWithImage.js"; // класс отвечающй за увеличенное фото
import PopupWithForm from "../components/PopupWithForm.js"; // класс отвечающий за попапа (профиля и новой карточки)
import PopupWithConfirmation from "../components/PopupWithConfirmation.js"; // класс отвечающий за попап удаления карточки
import Api from "../components/Api"; // класс api отвечающий за связь с сервером

import { handleCardClick, handelOpenPopupDeleteCard, handleLikeCard } from "../utils/utils"; // фукнции для работы с карточками (зум, удаление, лайк)

import "../pages/index.css";  // css для webpack


// необходимая переменная, для исключения дублированния класса
let section;


// ЭКЗЕМЛЯРЫ КЛАССОВ ДЛЯ РАБОТЫ С ДАННЫМИ
export const api = new Api(authorizationData); // api для обмена с сервером

export const popupWithImage = new PopupWithImage(".popup_type_zoom"); // попап увеличения картинки

const userInfo = new UserInfo({ title: ".profile__name", description: ".profile__description", avatar: ".profile__avatar" }); // класс для работы с данными пользователя


// ЭКЗЕМПЛЯРЫ КЛАССА ПОПАПОВ
export const popupWithConfirmation = new PopupWithConfirmation(".popup_type_delete-card", (card) => {
    popupWithConfirmation.renderLoading(true);

    api.deleteThisCard(card.cardId)
        .then(() => card.deleteElement())
        .catch(err => console.error(err))
        .finally(() => popupWithConfirmation.renderLoading(false));
}); // попап для удаления карточки


const popupProfile = new PopupWithForm(".popup_type_profile", (item) => {
    popupProfile.renderLoading(true);

    api.updateUserInfo({name: item.title, about: item.description})
        .then(newInfo => userInfo.updateUserTextInfo({ title: newInfo.name, description: newInfo.about }))
        .catch(err => console.error(err))
        .finally(() => popupProfile.renderLoading(false));
}); // попап для редактирования профиля


const popupSubmitCard = new PopupWithForm(".popup_type_elements", (card) => {
    popupSubmitCard.renderLoading(true);

    api.addNewCard(card)
        .then(card => section.addItem(card))
        .catch(err => console.error(err))
        .finally(() => popupSubmitCard.renderLoading(false));
}); // попап добавления новых мест


const popupAvatar = new PopupWithForm(".popup_type_edit_avatar", (avatar) => {
    popupAvatar.renderLoading(true);

    api.updateUserAvatar(avatar)
        .then(newInfo => {
            userInfo.updateUserAvatar({ avatar: newInfo.avatar })
        })
        .catch(() => alert('Пожалуйста, укажите ссылку на картинку'))
        .finally(() => popupAvatar.renderLoading(false));
}); // попап редактирования аватара


// добавления слушателей для сабмита (сброс обновления, сборка value с инпутов и обработка, закрытие попапа) и закрытия (фон и крестик)
popupProfile.setEventListeners(); // для профиля
popupSubmitCard.setEventListeners(); // для карточек
popupAvatar.setEventListeners(); // для аватара

// добавления слушателя для закрытия (фон и крестик)
popupWithImage.setEventListeners(); // зум картинки
popupWithConfirmation.setEventListeners(); // для удаления карточки



// ВАЛИДАЦИЯ
const profileEditFormValidator = new FormValidator(params, formProfile); // экземпляр класса FormValidator (профиль)
const newCardFormValidator = new FormValidator(params, cardForm); // экземпляр класса FormValidator (новые карточки)
const popupFormEditAvatar = new FormValidator(params, avatarForm); // экземляр класса FormValidator (автар)
// добавление валидации через публичный метод
profileEditFormValidator.enableValidation(); // для профиля
newCardFormValidator.enableValidation(); // для карточки
popupFormEditAvatar.enableValidation(); // для аватара



// ОТКРЫТИЕ ПОПАПОВ
profileEditButton.addEventListener("click", function () {
    popupProfile.open();

    const profileInfo = userInfo.getUserInfo();
    nameInput.value = profileInfo.title;
    jobInput.value = profileInfo.description;

    profileEditFormValidator.resetValidation();
});  // открыть редактор профиля

addElementButton.addEventListener('click', () => {
    popupSubmitCard.open();

    newCardFormValidator.resetValidation();
}); // открыть добавление места

avatarEditButton.addEventListener("click", () => {
    popupAvatar.open();

    popupFormEditAvatar.resetValidation();
}); // открыть редактор автара



// необходимо делать общий запрос, т.к. при отдельных, возможна ошибка в отражении (карточка без лайка или удаления и т.д.)
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(result => {
          const [info, startCards] = result;
          //загружаем данные с сервера о пользователи и сразу их рендерим и сохраняем в класс (важно первым, чтобы потом подтягивался ID)
            userInfo.setUserInfo({title: info.name, description: info.about, avatar: info.avatar, _id: info._id});


            // обрабатываем полученные карточки и переобъявляем section
            const reverseStartCard = startCards.reverse();

            section = new Section({
                items: reverseStartCard,
                renderer: (card) => {
                    const newCard = new Card(card, userInfo.getUserId(), '#templateElement', handleCardClick, handelOpenPopupDeleteCard, handleLikeCard);

                    return newCard.generateCard();
                }
            }, ".elements__box");


            // создаем все загруженные карточки
            section.renderItems();
    })
    .catch(err => alert(`Ошибка: ${err}`));
