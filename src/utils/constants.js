// карточки "из коробки"
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


// html классы для валидации
export const params = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_type_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_type_active",
};


// константы кнопок открытия попапа
export const popupEditProfile = document.querySelector(".popup_type_profile"); // поиск попапа профиля
export const profileEditButton = document.querySelector(".profile__edit-button"); // кнопка отркытия редактирования профиля (карандаш)

// Форма попапа (профиль)
export const formProfile = popupEditProfile.querySelector(".popup__form"); //  форма редактирования профиля
export const nameInput = formProfile.querySelector(".popup__input_type_name"); //   инпут имя (редактирование профиля)
export const jobInput = formProfile.querySelector(".popup__input_type_description"); //  инпут работа (редактирование профиля)

// константы попапа карточек
export const popupAddElement = document.querySelector(".popup_type_elements"); // поиск попапа добавления места
export const addElementButton = document.querySelector(".profile__add-button"); // кнопка открытия попапа добавления элемента (плюсик)

// константы формы карточек
export const cardForm = popupAddElement.querySelector(".popup__form"); // форма добавления элемента (место)
