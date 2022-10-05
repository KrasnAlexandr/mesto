// импорты
import {
    addElementButton, cardForm,
    elementInput,
    elementsBox,
    formProfile,
    imageCaption,
    imageSrcAndAlt,
    initialCards,
    job,
    jobInput,
    nameInput,
    params,
    popupAddElement,
    popupEditProfile,
    popups,
    popupZoomImage,
    profileEditButton,
    urlElementInput,
    name,
} from '../utils/constants'; // константы

import Card from "../components/Card.js"; // класс карточек
import FormValidator from "../components/FormValidator"; // класс валидации
import Section from "../components/Section.js"; // класс рендеринга
import Popup from "../components/Popup"; // класс попапа
import '../pages/index.css'; // css для webpack

// ПОД ВОПРОСОМ
// образцы классов форм
const profileEditFormValidator = new FormValidator(params, formProfile); // класс для профиля
const newCardFormValidator = new FormValidator(params, cardForm); // класс для карточки



// КОНЕЦ ПОД ВОПРОСОМ


// ФУНКЦИИ
// функция закрытия по Escape
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

// функция открытия попапов
const openPopup = popup => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};

// функция закрытия попапов
const closePopup = popup => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
};

// функция редактирования профиля
const submitProfileForm = () => {
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
};

//фукнция рндеринга карточки (и добавления в ленту)
const createCard = item => {
    const card = new Card(item, '#templateElement', handleOpenPopupZoom);

    return card.generateCard();
};

// Функция добавления карточки в ленту
const addCard = (card, container = elementsBox) => container.prepend(card);

// Функция добавления нового места (через попап)
const submitNewCard = () => {
    const item = {
        name: elementInput.value,
        link: urlElementInput.value
    }

    addCard(createCard(item));
};

// Функция закрытия по клику оверлея или кнопки (крестика)
const setPopupOverlayAndXListener = popups => {
    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closePopup(popup);
            }
            if (evt.target.classList.contains('popup__close-button')) {
                closePopup(popup);
            }
        })
    })
};


// КНОПКИ ОТКРЫТИЯ ПОПАПОВ
profileEditButton.addEventListener('click', function () {
    openPopup(popupEditProfile);

    nameInput.value = name.textContent;
    jobInput.value = job.textContent;

    profileEditFormValidator.resetValidation();
});  // открыть редактор профиля

addElementButton.addEventListener('click', () => {
    openPopup(popupAddElement)

    newCardFormValidator.resetValidation();
}); // открыть добавление места

function handleOpenPopupZoom(item) {
    imageSrcAndAlt.src = item.link;

    imageSrcAndAlt.alt = item.name;
    imageCaption.textContent = item.name;

    openPopup(popupZoomImage);
} // функция для открытия попапа картинки (передается в конструктор)


// ФОРМЫ РАБОТЫ С ДАННЫМИ
formProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();

    submitProfileForm();

    closePopup(popupEditProfile);
}); // сохранить изменения в редактировании профиля и закрыть попап (если сделать сброс инпутов, после открытия и закрытия, сразу горит красным, в таком случае чтобы редактировать чтото одно, то надо менять и второе)

cardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    submitNewCard();

    elementInput.value = '';
    urlElementInput.value = '';

    closePopup(popupAddElement);
}); // добавить новую карточку, сбросить форму и кнопку, закрыть попап


// Добавление всех карточек из коробки
initialCards.forEach((item) => addCard(createCard(item)));
// добавления закрытия по клику оверлея или кнопки (крестика) для всех попапов
setPopupOverlayAndXListener(popups);
// добавление валидации через публичный метод
profileEditFormValidator.enableValidation(); // для профиля
newCardFormValidator.enableValidation(); // для карточки

