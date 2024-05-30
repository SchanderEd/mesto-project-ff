const popups = [
  {
    type: 'edit profile',
    selectorPopup: '.popup_type_edit',
    classButton: 'profile__edit-button'
  },
  {
    type: 'image popup',
    selectorPopup: '.popup_type_image',
    classButton: 'card__image'
  },
  {
    type: 'new card popup',
    selectorPopup: '.popup_type_new-card',
    classButton: 'profile__add-button'
  }
];

const profileEditBtn = document.querySelector('.profile__edit-button');
const newCardBtn = document.querySelector('.profile__add-button');
const imgBtn = document.querySelectorAll('.card__image');

const closePopup = (evt) => {
  const popup = evt.target.closest('.popup');
  const closePopupBtn = popup.querySelector('.popup__close');

  if (evt.target === closePopupBtn || evt.target.contains(popup)) {
    popup.classList.remove('popup_is-opened');
  };
};

const keydownClosePopup = (evt) => {
  const domPopup = document.querySelector('.popup_is-opened');
  
  if (evt.key === 'Escape') {
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