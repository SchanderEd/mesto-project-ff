import { inputValue } from '../profile/profileEdit.js';
import {
  profileTitle,
  profileDescription,
  nameInput,
  descriptionInput
} from '../domElements.js';

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

export { closePopup, closePopupHandler, keydownClosePopup };