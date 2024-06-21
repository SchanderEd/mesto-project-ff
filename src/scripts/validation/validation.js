import { settingsValidation } from "../../index.js";

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(settingsValidation.inputErrorClass);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsValidation.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingsValidation.inputErrorClass);
  errorElement.classList.remove(settingsValidation.errorClass);
  errorElement.textContent = '';
};

const checkInputValidation = (formElement, inputElement) => {

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity("Поля могут содержать только латинские и кириллические буквы, знаки дефиса и пробелы.");
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settingsValidation.inputSelector));
  const buttonElement = formElement.querySelector(settingsValidation.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidation(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_inactive');
    buttonElement.setAttribute('disabled', 'disabled')
  } else {
    buttonElement.classList.remove('button_inactive');
    buttonElement.removeAttribute('disabled')
  };
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const enableValidation = (settings) => {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));

  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(form);
  });
};

const clearInputsError = (popup) => {
  const form = popup.querySelector('.popup__form');
  const inputList = Array.from(form.querySelectorAll(settingsValidation.inputSelector));
  const buttonElement = form.querySelector(settingsValidation.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement);
  });

  toggleButtonState(inputList, buttonElement);
};

export { hideInputError, enableValidation, toggleButtonState, clearInputsError };