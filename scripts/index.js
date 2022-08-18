// ИМПОРТ КАРТОЧЕК
import { initialCards } from "./initialCards.js";


// ВСЕ КОНСТАНТЫ ДЛЯ ПРОФИЛЯ
const popupEditProfile = document.querySelector('.popup__edit-profile'); // поиск попапа профиля
const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля (карандаш)
const popupCloseButtonProfile = popupEditProfile.querySelector('.popup__close-button'); // кнопка закрытия редактирования профиля
// Форма попапа (профиль)
const formProfile = popupEditProfile.querySelector('.popup__form'); // форма редактирования профиля
const nameInput = formProfile.querySelector('.popup__input_type_name'); // инпут имя (редактирование профиля)
const jobInput = formProfile.querySelector('.popup__input_type_description'); // инпут работа (редактирование профиля)
// Инпуты профиля
const name = document.querySelector('.profile__name'); // html имя профиля (то что редактируется в DOM)
const job = document.querySelector('.profile__description'); // html работа профиля (то что редактируется в DOM)


// ВСЕ КОНАСТАНТЫ ДЛЯ ДОБАВЛЕНИЯ ЭЛЕМЕНТОВ (МЕСТА)
const popupAddElement = document.querySelector('.popup__add-element') // поиск поапа добавления места
const addElementButton = document.querySelector('.profile__add-button'); // кнопка вызова попапа добавления элемента (плюсик)
const popupCloseButtonElement = popupAddElement.querySelector('.popup__close-button'); // кнопка закрытия добавления места
// Форма попапа (добавления элемента)
const formElement = popupAddElement.querySelector('.popup__form'); // форма добавления элемента (место)
const elementInput = formElement.querySelector('.popup__input_type_element'); // инпут название элемента (добавление места)
const urlElementInput = formElement.querySelector('.popup__input_type_url-element'); // инпут url картинки элемента (добавление картинки места)
// html элементы
const elementsBox = document.querySelector('.elements__box'); // место под карточки (ul)
const templateElement = document.querySelector('#templateElement').content; // template под карточки (li)


// ВСЕ КОНАСТАТЫ ЗУМ ПОПАПА (открытие в функции addElement)
const popupZoomImage = document.querySelector('.popup__zoom'); // поиск попапа фото
const popupCloseButtonZoomImage = popupZoomImage.querySelector('.popup__close-button'); // кнопка закрытия большой картинки


// ФУНКЦИИ
// Функция открытия попапов
const openPopup = popup => popup.classList.add('popup_opened');

// Функция открытия попапа профиля
function openPopupProfile(popup) {
    popup.classList.add('popup_opened');

    if (popupEditProfile.classList.contains('popup_opened')) {
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
    }
}


// Функция закрытия попапов
const closePopup = popup => popup.classList.remove('popup_opened');


//Функция редактирования профиля
function submitProfileForm (evt) {
    evt.preventDefault();

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;

    closePopup(popupEditProfile);
}

// Функция рендеринга карточки
function createCard (card) {
    const element = templateElement.cloneNode(true);

    element.querySelector('.element__image').src = card.link;
    element.querySelector('.element__image').alt = card.name;
    element.querySelector('.element__title').textContent = card.name;

    element.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_type_active');
    }) // лайк

    element.querySelector('.element__trash-button').addEventListener('click', function (evt) {
        evt.target.parentElement.remove();
    }) // удаление

    const imageSrcAndAlt = popupZoomImage.querySelector('.popup__zoom-image'); // img для src/alt
    const imageCaption = popupZoomImage.querySelector('.popup__figure-caption'); // img подпись

    element.querySelector('.element__image').addEventListener('click', function () {
        openPopup(popupZoomImage);
        imageSrcAndAlt.src = card.link;
        imageSrcAndAlt.alt = card.name;
        imageCaption.textContent = card.name;
    }) // увеличение фото (вызов поапа)

    return element;
}

// Функция добавления карточки в ленту
const addCard = (card, container = elementsBox) => container.prepend(card);

// Функция добавления нового места (через попап)
function submitElementForm (evt) {
    evt.preventDefault();

    addCard(createCard({name: elementInput.value, link: urlElementInput.value}));

    elementInput.value = '';
    urlElementInput.value = '';

    closePopup(popupAddElement);
}


// КНОПКИ ОТКРЫТИЯ ПОПАПОВ
profileEditButton.addEventListener('click',  () => openPopupProfile(popupEditProfile)); // открыть редактор профиля
addElementButton.addEventListener('click', () => openPopup(popupAddElement)); // открыть добавление места

// КНОПКИ ИЗМЕНЕНИЯ ДАННЫХ
formProfile.addEventListener('submit', submitProfileForm); // сохранить изменения в редактировании профиля и закрыть попап
formElement.addEventListener('submit', submitElementForm); // добавить новый элемент (место), сбросить инпуты и закрыть попап


// КНОПКИ ЗАКРЫТИЯ ПОПАПОВ
popupCloseButtonProfile.addEventListener('click',  () => closePopup(popupEditProfile)); // крестик закрытия (профиль)
popupCloseButtonElement.addEventListener('click',  () => closePopup(popupAddElement)); // крестик закрытия (добавления элемента)
popupCloseButtonZoomImage.addEventListener('click',  () => closePopup(popupZoomImage)); // крестик закрытия (большой картинки)


// ДОБАВЛЕНИЕ ВСЕХ КАРТОЧЕК ИЗ КОРОБКИ
initialCards.forEach((card) => addCard(createCard(card)));