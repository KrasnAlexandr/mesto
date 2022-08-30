// ИМПОРТ КАРТОЧЕК
import { initialCards } from "./initialCards.js";


// ВСЕ КОНСТАНТЫ ДЛЯ ПРОФИЛЯ
const popupEditProfile = document.querySelector('.popup_type_profile'); // поиск попапа профиля
const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка отркытия редактирования профиля (карандаш)
const popupCloseButtonProfile = popupEditProfile.querySelector('.popup__close-button'); // кнопка закрытия редактирования профиля
// Форма попапа (профиль)
const formProfile = popupEditProfile.querySelector('.popup__form'); //document.forms.formProfile; // форма редактирования профиля
const nameInput = formProfile.querySelector('.popup__input_type_name') ;// formProfile.elements.userName; // инпут имя (редактирование профиля)
const jobInput = formProfile.querySelector('.popup__input_type_description'); //formProfile.elements.description; // инпут работа (редактирование профиля)
// Текст контет профиля
const name = document.querySelector('.profile__name'); // html имя профиля (то что редактируется в DOM)
const job = document.querySelector('.profile__description'); // html работа профиля (то что редактируется в DOM)


// ВСЕ КОНАСТАНТЫ ДЛЯ ДОБАВЛЕНИЯ ЭЛЕМЕНТОВ (МЕСТА)
const popupAddElement = document.querySelector('.popup_type_elements'); // поиск поапа добавления места
const addElementButton = document.querySelector('.profile__add-button'); // кнопка открытия попапа добавления элемента (плюсик)
const popupCloseButtonElement = popupAddElement.querySelector('.popup__close-button'); // кнопка закрытия добавления места
// Форма попапа (добавления элемента)
const formElement = popupAddElement.querySelector('.popup__form'); //document.forms.formElement; // форма добавления элемента (место)
const elementInput = formElement.querySelector('.popup__input_type_element'); // formElement.elements.element; // инпут название элемента (добавление места)
const urlElementInput = formElement.querySelector('.popup__input_type_url-element'); // formElement.elements.urlElement; // инпут url картинки элемента (добавление картинки места)
// html элементы
const elementsBox = document.querySelector('.elements__box'); // место под карточки (ul)
const templateElement = document.querySelector('#templateElement').content; // template под карточки (li)


// ВСЕ КОНАСТАТЫ ЗУМ ПОПАПА
const popupZoomImage = document.querySelector('.popup_type_zoom'); // поиск попапа фото
const imageSrcAndAlt = popupZoomImage.querySelector('.popup__zoom-image'); // img для src/alt
const imageCaption = popupZoomImage.querySelector('.popup__figure-caption'); // img подпись
const popupCloseButtonZoomImage = popupZoomImage.querySelector('.popup__close-button'); // кнопка закрытия большой картинки


// ФУНКЦИИ
// Функция открытия попапов
const openPopup = popup => popup.classList.add('popup_opened');

// Функция закрытия попапов
const closePopup = popup => popup.classList.remove('popup_opened');


//Функция редактирования профиля
function submitProfileForm (evt) {
    evt.preventDefault();

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}

// Функция рендеринга карточки
function createCard (card) {
    const element = templateElement.cloneNode(true);

    element.querySelector('.element__image').src = card.link;
    element.querySelector('.element__image').alt = card.name;
    element.querySelector('.element__title').textContent = card.name;

    return element;
}

// Функция добавления карточки в ленту
function addCard (card, container = elementsBox) {
    container.prepend(card);
}

// Функция добавления нового места (через попап)
function submitElementForm (evt) {
    evt.preventDefault();

    addCard(createCard({name: elementInput.value, link: urlElementInput.value}));
}


// КНОПКИ ОТКРЫТИЯ ПОПАПОВ
profileEditButton.addEventListener('click', function () {
    openPopup(popupEditProfile);

    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
});  // открыть редактор профиля

addElementButton.addEventListener('click', () => openPopup(popupAddElement)); // открыть добавление места

// ФОРМЫ РАБОТЫ С ДАННЫМИ
formProfile.addEventListener('submit', (evt) => {
    submitProfileForm(evt);

    closePopup(popupEditProfile);
}); // сохранить изменения в редактировании профиля и закрыть попап (если сделать сброс инпутов, после открытия и закрытия, сразу горит красным, в таком случае чтобы редактировать чтото одно, то надо менять и второе)

formElement.addEventListener('submit', (evt) => {
    submitElementForm(evt);

    formElement.reset();

    closePopup(popupAddElement);
}); // добавить новый элемент (место), сбросить форму и закрыть попап

// Интерактив карточки
elementsBox.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('element__like-button')) {
        evt.target.classList.toggle('element__like-button_type_active');
    }

    if (evt.target.classList.contains('element__trash-button')) {
        evt.target.parentElement.remove();
    }

    if (evt.target.classList.contains('element__image')) {
        openPopup(popupZoomImage);
        imageSrcAndAlt.src = evt.target.src;
        imageSrcAndAlt.alt = evt.target.alt;
        imageCaption.textContent = evt.target.alt;
    }
}); // слушатель карточки (лайк, удаление и зум фото)



// СРЕДА РАЗРАБОРТКИ


const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_type_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('popup__error_type_active');
};

const hasInvalidInput = inputList => inputList.some((inputElement) => !inputElement.validity.valid);

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit-button_type_disabled');
        buttonElement.setAttribute('disabled', 'true');
    } else {
        buttonElement.classList.remove('popup__submit-button_type_disabled');
        buttonElement.removeAttribute('disabled', 'false');
    }
};


const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement ,inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = formElement => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

    const buttonElement = formElement.querySelector('.popup__submit-button');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);

            toggleButtonState(inputList, buttonElement);
        });
    });
};


const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement);
    });
};



// КОНЕЦ СРЕДЫ



// КНОПКИ ЗАКРЫТИЯ ПОПАПОВ
popupCloseButtonProfile.addEventListener('click',  () => closePopup(popupEditProfile)); // крестик закрытия (профиль)
popupCloseButtonElement.addEventListener('click',  () => closePopup(popupAddElement)); // крестик закрытия (добавления элемента)
popupCloseButtonZoomImage.addEventListener('click',  () => closePopup(popupZoomImage)); // крестик закрытия (большой картинки)


// ДОБАВЛЕНИЕ ВСЕХ КАРТОЧЕК ИЗ КОРОБКИ
initialCards.forEach((card) => addCard(createCard(card)));
// ФУНКЦИЯ ДОБАВЛЕНИЯ
enableValidation();

