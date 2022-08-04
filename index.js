let profileEditButton = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');

let popupCloseButton = document.querySelector('.popup__close-button');

function togglePopup() {
    popup.classList.toggle('popup_opened');
}

profileEditButton.addEventListener('click', togglePopup);

popupCloseButton.addEventListener('click', togglePopup);



let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_description');

let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__description');

nameInput.value = name.textContent;
jobInput.value = job.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault();

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;

    togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

