// функция добавления подписи ошибки под инпутом
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_type_active');
};

// фукнция скрытия подписи ошибки под инпутом
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('popup__error_type_active');
};


// функция проверки условий
const hasInvalidInput = inputList => inputList.some((inputElement) => !inputElement.validity.valid);

// функция активации и деактивации кнопки
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit-button_type_disabled');
        buttonElement.setAttribute('disabled', 'true');
    } else {
        buttonElement.classList.remove('popup__submit-button_type_disabled');
        buttonElement.removeAttribute('disabled', 'false');
    }
};


// функция проверки на валидность
const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement ,inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

// функция добавления слушателя всем инпутам
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


// функция сброса обновления страницы и добавления слушателей всем формам
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement);
    });
};


// включить валидацию
enableValidation();

enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submit-button',
        inactiveButtonClass: 'popup__submit-button_type_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_type_active'
});