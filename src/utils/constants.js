

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
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_type_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_type_active'
};


// псевдомассив попапов
export const popups = document.querySelectorAll(".popup"); // массив всех попапов

// константы профиля
export const popupEditProfile = document.querySelector('.popup_type_profile'); // поиск попапа профиля
export const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка отркытия редактирования профиля (карандаш)

// Форма попапа (профиль)
export const formProfile = popupEditProfile.querySelector('.popup__form'); //  форма редактирования профиля
export const nameInput = formProfile.querySelector('.popup__input_type_name'); //   инпут имя (редактирование профиля)
export const jobInput = formProfile.querySelector('.popup__input_type_description'); //  инпут работа (редактирование профиля)

// html элементы
export const elementsBox = document.querySelector('.elements__box'); // место под карточки (ul)
export const name = document.querySelector('.profile__name'); // html имя профиля (то что редактируется в DOM)
export const job = document.querySelector('.profile__description'); // html работа профиля (то что редактируется в DOM)

// константы попапа карточек
export const popupAddElement = document.querySelector('.popup_type_elements'); // поиск попапа добавления места
export const addElementButton = document.querySelector('.profile__add-button'); // кнопка открытия попапа добавления элемента (плюсик)

// константы формы карточек
export const cardForm = popupAddElement.querySelector('.popup__form'); // форма добавления элемента (место)
export const elementInput = cardForm.querySelector('.popup__input_type_element'); //  инпут название элемента (добавление места)
export const urlElementInput = cardForm.querySelector('.popup__input_type_url-element'); // инпут url картинки элемента (добавление картинки места)

// константы зум попапа
export const popupZoomImage = document.querySelector('.popup_type_zoom');
export const imageSrcAndAlt = popupZoomImage.querySelector('.popup__zoom-image');
export const imageCaption = popupZoomImage.querySelector('.popup__figure-caption');