// ИМПОРТ КАРТОЧЕК
import { initialCards } from "./initialCards.js";


// ВСЕ КОНСТАНТЫ ДЛЯ ПРОФИЛЯ
const popupArray = Array.from(document.querySelectorAll(".popup")); // массив всех попапов
const popupEditProfile = document.querySelector('.popup_type_profile'); // поиск попапа профиля
const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка отркытия редактирования профиля (карандаш)
const popupCloseButtonProfile = popupEditProfile.querySelector('.popup__close-button'); // кнопка закрытия редактирования профиля

// Форма попапа (профиль)
const formProfile = document.forms.formProfile; // popupEditProfile.querySelector('.popup__form'); // форма редактирования профиля
const nameInput = formProfile.elements.userName; // formProfile.querySelector('.popup__input_type_name') ;//  инпут имя (редактирование профиля)
const jobInput = formProfile.elements.description; // formProfile.querySelector('.popup__input_type_description'); // инпут работа (редактирование профиля)

// Текст контет профиля
const name = document.querySelector('.profile__name'); // html имя профиля (то что редактируется в DOM)
const job = document.querySelector('.profile__description'); // html работа профиля (то что редактируется в DOM)

// ВСЕ КОНАСТАНТЫ ДЛЯ ДОБАВЛЕНИЯ ЭЛЕМЕНТОВ (МЕСТА)
const popupAddElement = document.querySelector('.popup_type_elements'); // поиск поапа добавления места
const addElementButton = document.querySelector('.profile__add-button'); // кнопка открытия попапа добавления элемента (плюсик)
const popupCloseButtonElement = popupAddElement.querySelector('.popup__close-button'); // кнопка закрытия добавления места

// Форма попапа (добавления элемента)
const formElement = document.forms.formElement; // popupAddElement.querySelector('.popup__form'); // форма добавления элемента (место)
const elementInput = formElement.elements.element; // formElement.querySelector('.popup__input_type_element'); // инпут название элемента (добавление места)
const urlElementInput = formElement.elements.urlElement; // formElement.querySelector('.popup__input_type_url-element'); // инпут url картинки элемента (добавление картинки места)

// html элементы
const elementsBox = document.querySelector('.elements__box'); // место под карточки (ul)
const templateElement = document.querySelector('#templateElement').content; // template под карточки (li)

// ВСЕ КОНАСТАТЫ ЗУМ ПОПАПА
const popupZoomImage = document.querySelector('.popup_type_zoom'); // поиск попапа фото
const imageSrcAndAlt = popupZoomImage.querySelector('.popup__zoom-image'); // img для src/alt
const imageCaption = popupZoomImage.querySelector('.popup__figure-caption'); // img подпись
const popupCloseButtonZoomImage = popupZoomImage.querySelector('.popup__close-button'); // кнопка закрытия большой картинки


// ФУНКЦИИ
// фукнция для слушателя (нажатие escape)
const setKeyListenerEsc = evt => {
    if (evt.key === 'Escape') {
        popupArray.forEach((popup) => {
            if (popup.classList.contains('popup_opened')) {
                closePopup(popup)
            }
        })
    }
};

// фукнция проверки классов попапа
const checkPopupOpened = popup => popup.classList.contains('popup_opened');

// функция для добавления и удаления слушателя (добавляется при открытии попапа, удаляется при закрытии)
const toggleListenerForKey = () => {
    if (popupArray.some(checkPopupOpened)) {
        document.addEventListener('keydown', (evt) => setKeyListenerEsc(evt));
    } else {
        document.removeEventListener('keydown', (evt) => setKeyListenerEsc(evt));
    }
};

// функция открытия попапов
const openPopup = popup => {
    popup.classList.add('popup_opened');
    toggleListenerForKey();
};

// функция закрытия попапов
const closePopup = popup => {
    popup.classList.remove('popup_opened');
    toggleListenerForKey()
};

// функция редактирования профиля
const submitProfileForm = () => {
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
};

// функция рендеринга карточки
const createCard = (card) => {
    const element = templateElement.cloneNode(true);

    element.querySelector('.element__image').src = card.link;
    element.querySelector('.element__image').alt = card.name;
    element.querySelector('.element__title').textContent = card.name;

    return element;
};

// Функция добавления карточки в ленту
const addCard = (card, container = elementsBox) => {
    container.prepend(card);
};

// Функция добавления нового места (через попап)
const submitElementForm = () => addCard(createCard({name: elementInput.value, link: urlElementInput.value}));

// Функция закрытия по клику оверлея, для всех попапов
const setPopupOverlayListener = array =>{
    array.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            closePopup(evt.target);
        });
    });
};

// КНОПКИ ОТКРЫТИЯ ПОПАПОВ
profileEditButton.addEventListener('click', function () {
    openPopup(popupEditProfile);

    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
});  // открыть редактор профиля

addElementButton.addEventListener('click', () => openPopup(popupAddElement)); // открыть добавление места

// ФОРМЫ РАБОТЫ С ДАННЫМИ
formProfile.addEventListener('submit', () => {
    submitProfileForm();

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


// КНОПКИ ЗАКРЫТИЯ ПОПАПОВ
popupCloseButtonProfile.addEventListener('click',  () => closePopup(popupEditProfile)); // крестик закрытия (профиль)

popupCloseButtonElement.addEventListener('click',  () => {
    elementInput.value = "";
    urlElementInput.value = "";

    closePopup(popupAddElement)
}); // крестик закрытия (добавления элемента)

popupCloseButtonZoomImage.addEventListener('click',  () => closePopup(popupZoomImage)); // крестик закрытия (большой картинки)


// добавления всех карточке из коробки
initialCards.forEach((card) => addCard(createCard(card)));
// добавления закрытия по клику оверлея для всех попапов
setPopupOverlayListener(popupArray);


