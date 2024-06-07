const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', keydownClosePopup);
  popup.addEventListener('click', closePopupHandler);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keydownClosePopup);
  popup.removeEventListener('click', closePopupHandler);
};

const keydownClosePopup = (evt) => {
  const openedPopup = document.querySelector('.popup_is-opened');

  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  };
};

const closePopupHandler = (evt) => {
  const openedPopup = document.querySelector('.popup_is-opened');
  const closeBtn = openedPopup.querySelector('.popup__close');
  const saveBtn = openedPopup.querySelector('.popup__button');

  if (evt.target.contains(openedPopup) || evt.target === closeBtn || evt.target === saveBtn) {
    closePopup(openedPopup);
  };
};

export {
  closePopup,
  closePopupHandler,
  keydownClosePopup,
  openPopup
};