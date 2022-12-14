export default class FormValidator {

    #inputSelector;
    #submitButtonSelector;
    #inactiveButtonClass;
    #inputErrorClass;
    #errorClass;
    #classForm;
    #inputList;
    #buttonElement;

    constructor({ inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, classForm) {
        // все классы
        this.#inputSelector = inputSelector;
        this.#submitButtonSelector = submitButtonSelector;
        this.#inactiveButtonClass = inactiveButtonClass;
        this.#inputErrorClass = inputErrorClass;
        this.#errorClass = errorClass;

        // форма которой добавлем валидацию
        this.#classForm = classForm;

        this.#inputList = Array.from(this.#classForm.querySelectorAll(this.#inputSelector)); // поиск всех инпутов формы
        this.#buttonElement = this.#classForm.querySelector(this.#submitButtonSelector); // кнопка формы

    }

    // функция добавления подписи ошибки под инпутом
    #showInputError(inputElement, errorMessage) {
        const errorElement = this.#classForm.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this.#inputErrorClass);
        errorElement.classList.add(this.#errorClass);
        errorElement.textContent = errorMessage;
    }

    // фукнция скрытия подписи ошибки под инпутом
    #hideInputError(inputElement) {
        const errorElement = this.#classForm.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this.#inputErrorClass);
        errorElement.classList.remove(this.#errorClass);
        errorElement.textContent = "";
    }

    // проверка валидности инпутов
    #checkInputValidity(inputElement) {
        return !inputElement.validity.valid
        ? this.#showInputError(inputElement, inputElement.validationMessage)
        : this.#hideInputError(inputElement);
    }

    // функция проверки инпутов
    #hasInvalidInput = () => this.#inputList.some((inputElement) => !inputElement.validity.valid);


    // функция активации и деактивации кнопки
    #toggleButtonState() {
        if (this.#hasInvalidInput()) {
            this.#buttonElement.classList.add(this.#inactiveButtonClass);
            this.#buttonElement.setAttribute("disabled", "disabled")
        } else {
            this.#buttonElement.classList.remove(this.#inactiveButtonClass);
            this.#buttonElement.removeAttribute("disabled")
        }
    }

    // функция добавления слушателя всем инпутам
    #setEventListeners() {
        this.#toggleButtonState()
        this.#inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this.#checkInputValidity(inputElement);
                this.#toggleButtonState();
            })
        })
    }


    // публинчый метод для сброса ошибок и кнопки сабмита
    resetValidation() {
        this.#toggleButtonState();

        this.#inputList.forEach((inputElement) => {
            this.#hideInputError(inputElement)
        });
    }

    // публичный метод, для добавления валидации форме
    enableValidation() {
        this.#setEventListeners();
    }
}
