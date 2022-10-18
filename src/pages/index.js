// импорты
import {
    addElementButton,
    cardForm,
    formProfile,
    initialCards,
    jobInput,
    nameInput,
    params,
    profileEditButton,
} from "../utils/constants.js"; // константы

import { createCard } from "../utils/utils.js" // импорт универслаьной функции создания карточки

import Section from "../components/Section.js"; // класс рендеринга
import FormValidator from "../components/FormValidator.js"; // класс валидации

import UserInfo from "../components/UserInfo"; // класс отвечающий за информацию профиля
import PopupWithImage from "../components/PopupWithImage.js"; // класс отвечающй за увеличенное фото
import PopupWithForm from "../components/PopupWithForm.js"; // класс отвечающий за попапа (профиля и новой карточки)

import "../pages/index.css"; // css для webpack



// экземпляр классов
export const popupWithImage = new PopupWithImage(".popup_type_zoom"); // экземпляр класса PopupWithImage (зуя картинки)

const userInfo = new UserInfo({ title:".profile__name", description:".profile__description" }); // экземпляр класса UserInfo

const section = new Section({ items: initialCards,
    renderer: (item) => section.addItem(createCard(item))
    },".elements__box"); // экземпляр класса Section

const popupProfile = new PopupWithForm(".popup_type_profile", (item) => userInfo.setUserInfo(item)); // экземпляр класса PopupWithForm (профиль)

const popupSubmitCard = new PopupWithForm(".popup_type_elements", (item) => section.addItem(createCard(item))); // экземпляр класса PopupWithForm (новые карточки)



// валидация
const profileEditFormValidator = new FormValidator(params, formProfile); // экземпляр класса FormValidator (профиль)
const newCardFormValidator = new FormValidator(params, cardForm); // экземпляр класса FormValidator (новые карточки)



// рендеринг карточек из коробки
section.renderItems();// добавление всех карточек из коробки, публичным методом

// добавления слушателей для сабмита (сброс обновления, сборка value с инпутов и обработка, закрытие попапа) и закрытия (фон и крестик)
popupProfile.setEventListeners(); // для профиля
popupSubmitCard.setEventListeners(); // для карточек

// добавления слушателя для закрытия (фон и крестик)
popupWithImage.setEventListeners(); // зум картинки

// добавление валидации через публичный метод
profileEditFormValidator.enableValidation();  // для профиля
newCardFormValidator.enableValidation(); // для карточки



// слушатели для кнопок открытия попапов
profileEditButton.addEventListener("click", function () {
    popupProfile.open()

    const profileInfo = userInfo.getUserInfo();
    nameInput.value = profileInfo.title;
    jobInput.value = profileInfo.description

    profileEditFormValidator.resetValidation();
});  // открыть редактор профиля

addElementButton.addEventListener('click', () => {
    popupSubmitCard.open()

    newCardFormValidator.resetValidation();
}); // открыть добавление места
