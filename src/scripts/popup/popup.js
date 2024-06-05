import { popups } from "./popups.js";
import { editProfile } from "../profile/profileEdit.js";
import { newCardFormSubmit } from "../card/newCard.js";
import { openPopup } from "./openPopup.js";
import { closePopupHandler, keydownClosePopup } from "./closePopup.js";

const getPopup = (evt) => {
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

  if (form && !form.description) {
    form.addEventListener('submit', newCardFormSubmit);
  };

  if (evt.target.classList.contains('card__image')) {
    const img = evt.target;

    const popupImg = document.querySelector('.popup__image');
    popupImg.src = img.src;

    const popupCaption = document.querySelector('.popup__caption');
    popupCaption.textContent = img.alt;
  };

  closeBtn.addEventListener('click', closePopupHandler);
  domPopup.addEventListener('click', closePopupHandler);
  document.addEventListener('keydown', keydownClosePopup);

  openPopup(domPopup);
};

export { getPopup };