// Импорты
import initialCards from './initialCards.js'; // карточки
import Card from './Card.js'; // класс
import FormValidator from './FormValidator.js';



// СРЕДА РАЗРАБОТКИ





// КОНЕЦ СРЕДЫ



// массивы
const popups = document.querySelectorAll(".popup"); // массив всех попапов

// константы профиля
const popupEditProfile = document.querySelector('.popup_type_profile'); // поиск попапа профиля
const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка отркытия редактирования профиля (карандаш)

// Форма попапа (профиль)
const formProfile = popupEditProfile.querySelector('.popup__form'); //  форма редактирования профиля
const nameInput = formProfile.querySelector('.popup__input_type_name'); //   инпут имя (редактирование профиля)
const jobInput = formProfile.querySelector('.popup__input_type_description'); //  инпут работа (редактирование профиля)

// html элементы
const elementsBox = document.querySelector('.elements__box'); // место под карточки (ul)
const name = document.querySelector('.profile__name'); // html имя профиля (то что редактируется в DOM)
const job = document.querySelector('.profile__description'); // html работа профиля (то что редактируется в DOM)

// константы попапа карточек
const popupAddElement = document.querySelector('.popup_type_elements'); // поиск попапа добавления места
const addElementButton = document.querySelector('.profile__add-button'); // кнопка открытия попапа добавления элемента (плюсик)

// константы формы карточек
const cardForm = popupAddElement.querySelector('.popup__form'); // форма добавления элемента (место)
const elementInput = cardForm.querySelector('.popup__input_type_element'); //  инпут название элемента (добавление места)
const urlElementInput = cardForm.querySelector('.popup__input_type_url-element'); // инпут url картинки элемента (добавление картинки места)



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
const renderingAndPublishingCard = item => {
    const card = new Card(item);

    const renderCard = card.generateCard();

    addCard(renderCard);
};

// Функция добавления карточки в ленту
const addCard = (card, container = elementsBox) => container.prepend(card);

// Функция добавления нового места (через попап)
const submitNewCard = () => {
    const item = { name: elementInput.value, link: urlElementInput.value }

    renderingAndPublishingCard(item);
};

// Функция закрытия по клику оверлея или кнопки (крестика)
const setPopupOverlayAndXListener = popups => {
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
};


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
    submitNewCard();

    evt.target.reset()

    evt.submitter.classList.add('popup__submit-button_type_disabled');
    evt.submitter.setAttribute('disabled', 'true');

    closePopup(popupAddElement);
}); // добавить новую карточку, сбросить форму и кнопку, закрыть попап


// Добавление всех карточек из коробки
initialCards.forEach((item) => renderingAndPublishingCard(item));
// добавления закрытия по клику оверлея или кнопки (крестика) для всех попапов
setPopupOverlayAndXListener(popups);



