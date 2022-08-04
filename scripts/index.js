let popup = document.querySelector('.popup');
let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');

let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__description');

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_description');




function togglePopup() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;

    popup.classList.toggle('popup_opened');
}


function formSubmitHandler (evt) {
    evt.preventDefault();

    if (popup.classList.contains('popup_opened')) {
        name.textContent = nameInput.value;
        job.textContent = jobInput.value;
    }

    togglePopup();
}



profileEditButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);











