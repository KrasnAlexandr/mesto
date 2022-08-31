// функция добавления подписи ошибки под инпутом
const showInputError = (formElement, inputElement, errorMessage, params) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_type_active');
};

// фукнция скрытия подписи ошибки под инпутом
const hideInputError = (formElement, inputElement, params) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('popup__error_type_active');
};


// функция проверки условий
const hasInvalidInput = inputList => inputList.some((inputElement) => !inputElement.validity.valid);

// функция активации и деактивации кнопки
const toggleButtonState = (inputList, buttonElement, params) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(params.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'true');
    } else {
        buttonElement.classList.remove(params.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', 'false');
    }
};


// функция проверки на валидность
const isValid = (formElement, inputElement, params) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement ,inputElement, inputElement.validationMessage, params);
    } else {
        hideInputError(formElement, inputElement, params);
    }
};

// функция добавления слушателя всем инпутам
const setEventListeners = (formElement, params) => {
    const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));

    const buttonElement = formElement.querySelector(params.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, params);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, params);

            toggleButtonState(inputList, buttonElement, params);
        });
    });
};


// функция сброса обновления страницы и добавления слушателей всем формам
const enableValidation = (params) => {
    const formList = Array.from(document.querySelectorAll(params.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, params);
    });
};

// включить валидацию
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_type_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_type_active'
});


