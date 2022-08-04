let profileEditButton = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');

let popupCloseButton = document.querySelector('.popup__close-button');

function togglePopup() {
    popup.classList.toggle('popup_opened');
}

profileEditButton.addEventListener('click', togglePopup);

popupCloseButton.addEventListener('click', togglePopup);




let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__description');

let inputName = document.querySelector('.popup__input_name');
let inputJob = document.querySelector('.popup__input_description');

let saveButton = document.querySelector('.popup__submit-button');

inputName.value = name.textContent;
inputJob.value = job.textContent;

function saveChanges() {
    name.textContent = inputName.value;
    job.textContent = inputJob.value;

    togglePopup()
}

saveButton.addEventListener('click', saveChanges);


