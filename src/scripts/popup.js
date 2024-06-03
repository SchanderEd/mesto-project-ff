import { popups } from "./popups.js";
import { profileInputValue } from './profileEdit.js';
import {
  profileTitle,
  profileDescription,
  nameInput,
  descriptionInput
} from './domElements.js'

const closePopup = (evt) => {
  const popup = document.querySelector('.popup_is-opened');
  const closeBtn = popup.querySelector('.popup__close');
  const saveBtn = popup.querySelector('.popup__button');

  if (evt.target.contains(popup) || evt.target === closeBtn || evt.target === saveBtn) {
    popup.classList.remove('popup_is-opened'); 
    document.removeEventListener('keydown', keydownClosePopup);
    popup.removeEventListener('click', closePopup);
  };
};

const keydownClosePopup = (evt) => {
  const domPopup = document.querySelector('.popup_is-opened');
  const form = domPopup.querySelector('.popup__form');

  if (evt.key === 'Escape') {

    if (form && !form.name && !form.description) {
      form.reset();
    };

    if (form && form.name && form.description) {
      profileInputValue(nameInput, descriptionInput, profileTitle, profileDescription);
    };

    domPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', keydownClosePopup);
  };
};

const openPopup = (evt) => {
  let popup = popups.filter((popupData) => {
    if (popupData.classButton === evt.target.classList.value) {
      popup = popupData;
      return popup;
    };
  });

  const domPopup = document.querySelector(popup[0].selectorPopup);
  const closeBtn = domPopup.querySelector('.popup__close');

  domPopup.classList.add('popup_is-opened');

  closeBtn.addEventListener('click', closePopup);
  domPopup.addEventListener('click', closePopup);
  document.addEventListener('keydown', keydownClosePopup);
};

export { openPopup, closePopup };