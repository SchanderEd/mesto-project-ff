import { popups } from "./popups.js";
import { inputValue } from './profileEdit.js';
import { editProfile } from "./profileEdit.js";
import {
  profileTitle,
  profileDescription,
  nameInput,
  descriptionInput
} from './domElements.js';

const formNewPlaceName = 'new-place';

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keydownClosePopup);
  popup.removeEventListener('click', closePopupHandler);
};

const closePopupHandler = (evt) => {
  const popup = document.querySelector('.popup_is-opened');
  const closeBtn = popup.querySelector('.popup__close');
  const saveBtn = popup.querySelector('.popup__button');
  const form = popup.querySelector('.popup__form');

  const conditionTargetsClose = evt.target.contains(popup) || evt.target === closeBtn;

  if (conditionTargetsClose || evt.target === saveBtn) {
    closePopup(popup);
  };

  if (form && form.name && form.description && conditionTargetsClose) {
    inputValue(nameInput, descriptionInput, profileTitle, profileDescription);
  };

  if (form && form.name === formNewPlaceName && conditionTargetsClose) {
    form.reset();
  };
};

const keydownClosePopup = (evt) => {
  const domPopup = document.querySelector('.popup_is-opened');
  const form = domPopup.querySelector('.popup__form');

  if (evt.key === 'Escape') {

    if (form && form.name === formNewPlaceName) {
      form.reset();
    };

    if (form && form.name && form.description) {
      inputValue(nameInput, descriptionInput, profileTitle, profileDescription);
    };

    closePopup(domPopup);
  };
};

const openPopupHandler = (evt) => {
  let popup = popups.filter((popupData) => {
    if (popupData.classButton === evt.target.classList.value) {
      popup = popupData;
      return popup;
    };
  });

  const domPopup = document.querySelector(popup[0].selectorPopup);
  const closeBtn = domPopup.querySelector('.popup__close');
  const form = domPopup.querySelector('.popup__form');

  if (form && form.name && form.description) {
    form.addEventListener('submit', editProfile);
  };

  domPopup.classList.add('popup_is-opened');

  closeBtn.addEventListener('click', closePopupHandler);
  domPopup.addEventListener('click', closePopupHandler);
  document.addEventListener('keydown', keydownClosePopup);
};

export { openPopupHandler, closePopupHandler };