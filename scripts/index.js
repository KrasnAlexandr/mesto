// ИМПОРТ КАРТОЧЕК
import { initialCards } from "./initialCards.js";


// ВСЕ КОНСТАНТЫ ДЛЯ ПРОФИЛЯ
const popups = document.querySelectorAll(".popup"); // массив всех попапов
const popupEditProfile = document.querySelector('.popup_type_profile'); // поиск попапа профиля
const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка отркытия редактирования профиля (карандаш)

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

// Форма попапа (добавления элемента)
const cardForm = document.forms.cardForm; // popupAddElement.querySelector('.popup__form'); // форма добавления элемента (место)
const elementInput = cardForm.elements.element; // cardForm.querySelector('.popup__input_type_element'); // инпут название элемента (добавление места)
const urlElementInput = cardForm.elements.urlElement; // cardForm.querySelector('.popup__input_type_url-element'); // инпут url картинки элемента (добавление картинки места)

// html элементы
const elementsBox = document.querySelector('.elements__box'); // место под карточки (ul)
const templateElement = document.querySelector('#templateElement').content; // template под карточки (li)

// ВСЕ КОНАСТАТЫ ЗУМ ПОПАПА
const popupZoomImage = document.querySelector('.popup_type_zoom'); // поиск попапа фото
const imageSrcAndAlt = popupZoomImage.querySelector('.popup__zoom-image'); // img для src/alt
const imageCaption = popupZoomImage.querySelector('.popup__figure-caption'); // img подпись


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


// фукнция добавления интерактива карточки (слушатель карточки: лайк, удаление и зум фото)
const addListenerForCard = (element, card, elementImage) => {
    element.querySelector('.element__like-button').addEventListener('click', (evt) =>
        evt.target.classList.toggle('element__like-button_type_active')); // лайк

    element.querySelector('.element__trash-button').addEventListener('click', (evt) =>
        evt.target.parentElement.remove()); // удаление

    elementImage.addEventListener('click', () => {
        openPopup(popupZoomImage);
        imageSrcAndAlt.src = card.link;
        imageSrcAndAlt.alt = card.name;
        imageCaption.textContent = card.name;
    }) // увеличение фото (вызов поапа)
}

// функция рендеринга карточки
const createCard = (card) => {
    const element = templateElement.cloneNode(true);

    const elementImage = element.querySelector('.element__image');

    elementImage.src = card.link;
    elementImage.alt = card.name;
    element.querySelector('.element__title').textContent = card.name;

    addListenerForCard(element, card, elementImage)

    return element;
};

// Функция добавления карточки в ленту
const addCard = (card, container = elementsBox) => container.prepend(card);

// Функция добавления нового места (через попап)
const submitCardForm = () => addCard(createCard({name: elementInput.value, link: urlElementInput.value}));

// Функция закрытия по клику оверлея или кнопки (крестика)
const setPopupOverlayListener = popups => {
    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closePopup(popup)
            }
            if (evt.target.classList.contains('popup__close-button')) {
                closePopup(popup)
            }
        })
    })
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
    submitProfileForm();

    evt.submitter.classList.add('popup__submit-button_type_disabled');
    evt.submitter.setAttribute('disabled', 'true');

    closePopup(popupEditProfile);
}); // сохранить изменения в редактировании профиля и закрыть попап (если сделать сброс инпутов, после открытия и закрытия, сразу горит красным, в таком случае чтобы редактировать чтото одно, то надо менять и второе)


cardForm.addEventListener('submit', (evt) => {
    submitCardForm(evt);

    evt.target.reset()

    evt.submitter.classList.add('popup__submit-button_type_disabled');
    evt.submitter.setAttribute('disabled', 'true');
    //спасибо за подробное и поучительное ревью

    closePopup(popupAddElement);
}); // добавить новый элемент (место), сбросить форму и кнопку, закрыть попап


// добавления всех карточке из коробки
initialCards.forEach((card) => addCard(createCard(card)));
// добавления закрытия по клику оверлея или кнопки (крестика) для всех попапов
setPopupOverlayListener(popups);


