import { popups } from "./popups.js";

const profileEditBtn = document.querySelector('.profile__edit-button');
const newCardBtn = document.querySelector('.profile__add-button');
const imgBtn = document.querySelectorAll('.card__image');

const closePopup = (evt) => {
  const popup = document.querySelector('.popup_is-opened');
  const closePopupBtn = popup.querySelector('.popup__close');
  const form = popup.querySelector('.popup__form');

  if (evt.target === closePopupBtn || evt.target.contains(popup)) {

    if (form) {
      form.reset();
    };

    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', keydownClosePopup);
  };
};

const keydownClosePopup = (evt) => {
  const domPopup = document.querySelector('.popup_is-opened');
  const form = domPopup.querySelector('.popup__form');

  if (evt.key === 'Escape') {

    if (form) {
      form.reset();
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
  domPopup.classList.add('popup_is-opened');

  domPopup.addEventListener('click', closePopup);
  document.addEventListener('keydown', keydownClosePopup);
};

profileEditBtn.addEventListener('click', openPopup);
newCardBtn.addEventListener('click', openPopup);
imgBtn.forEach((img) => img.addEventListener('click', openPopup));