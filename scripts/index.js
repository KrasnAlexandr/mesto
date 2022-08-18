// ВСЕ КОНСТАНТЫ ДЛЯ ПРОФИЛЯ
const popupEditProfile = document.querySelector('#editProfile'); // поиск попапа профиля
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
const popupAddElement = document.querySelector('#addElement') // поиск поапа добавления места
const addElementButton = document.querySelector('.profile__add-button'); // кнопка вызова попапа добавления элемента (плюсик)
const popupCloseButtonElement = popupAddElement.querySelector('.popup__close-button'); // кнопка закрытия добавления места
// Форма попапа (добавления элемента)
const formElement = popupAddElement.querySelector('.popup__form'); // форма добавления элемента (место)
const elementInput = formElement.querySelector(('.popup__input_type_element')); // инпут название элемента (добавление места)
const urlElementInput = formElement.querySelector(('.popup__input_type_url-element')); // инпут url картинки элемента (добавление картинки места)
// html элементы
const elementsBox = document.querySelector('.elements__box'); // место под карточки (ul)
const templateElement = document.querySelector('#templateElement').content; // template под карточки (li)


// ВСЕ КОНАСТАТЫ ЗУМ ПОПАПА (открытие в функции addElement)
const popupZoomImage = document.querySelector('#zoomImage'); // поиск попапа фото
const popupCloseButtonZoomImage = popupZoomImage.querySelector('.popup__close-button'); // кнопка закрытия большой картинки


// КАРТОЧКИ ИЗ КОРОБКИ
const initialCards = [
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
    },
];


// ФУНКЦИИ
// Функция открытия попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');

    if (popupEditProfile.classList.contains('popup_opened')) {
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
    }
}

// Функция закрытия попапов
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

//Функция редактирования профиля
function formSubmitHandler (evt) {
    evt.preventDefault();

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;

    closePopup(popupEditProfile);
}

// Функция добавления карточки (для обработки массива используется forEach)
function addElement (card) {
    const element = templateElement.cloneNode(true);

    element.querySelector('.element__image').src = card.link;
    element.querySelector('.element__image').alt = card.name;
    element.querySelector('.element__title').textContent = card.name;

    element.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_type_active');
    }); // лайк

    element.querySelector('.element__trash-button').addEventListener('click', function (evt) {
        evt.target.parentElement.remove();
    }); // удаление

    const imageSrcAndAlt = popupZoomImage.querySelector('.popup__zoom-image'); // img popupZoomImage
    const imageCaption = popupZoomImage.querySelector('.popup__figure-caption'); // caption popupZoomImage

    element.querySelector('.element__image').addEventListener('click', function () {
        openPopup(popupZoomImage);
        imageSrcAndAlt.src = card.link;
        imageSrcAndAlt.alt = card.name;
        imageCaption.textContent = card.name;
    }); // увеличение фото (вызов поапа)

    elementsBox.prepend(element);
}

// Функция добавления нового места (через попап)
function formSubmitElement (evt) {
    evt.preventDefault();

    addElement({name: elementInput.value, link: urlElementInput.value});

    elementInput.value = '';
    urlElementInput.value = '';

    closePopup(popupAddElement);
}


// КНОПКИ ОТКРЫТИЯ ПОПАПОВ
profileEditButton.addEventListener('click', function () {
    openPopup(popupEditProfile);
}); // открыть редактор профиля

addElementButton.addEventListener('click', function () {
    openPopup(popupAddElement);
}) // открыть добавление места


// КНОПКИ ИЗМЕНЕНИЯ ДАННЫХ
formProfile.addEventListener('submit', formSubmitHandler); // сохранить изменения в редактировании профиля и закрыть попап
formElement.addEventListener('submit', formSubmitElement); // добавить новый элемент (место), сбросить инпуты и закрыть попап


// КНОПКИ ЗАКРЫТИЯ ПОПАПОВ
popupCloseButtonProfile.addEventListener('click', function () {
    closePopup(popupEditProfile);
}); // крестик закрытия (профиль)

popupCloseButtonElement.addEventListener('click', function () {
    closePopup(popupAddElement);
}); // крестик закрытия (добавления элемента)

popupCloseButtonZoomImage.addEventListener('click', function () {
   closePopup(popupZoomImage)
});  // крестик закрытия (большой картинки)


// АВТОМАТИЧЕСКИЕ ИЗМЕНЕНИЯ СТРАНИЦЫ
initialCards.forEach(addElement); // Добавляем все элементы "карточки из коробки" при загрузке страницы









