import './index.css';
import { initialCards } from './scripts/card/cards';
import { createCard, removeCard, likeCard } from './scripts/card/card';
import { closePopupHandler } from './scripts/popup/modal.js';
import { profilePopupHandler } from './scripts/popup/profileHandler.js';
import { handlePreviewPicture } from './scripts/popup/previewImgHandler.js';
import { newCardPopupHandler } from './scripts/popup/newCardPopupHandler';
import { editProfile, getProfile } from './scripts/profile/profileEdit.js';
import { newCardFormSubmit } from './scripts/card/newCard';

const profileForm = document.forms['edit-profile'];
const newCardForm = document.forms['new-place'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const descriptionInput = profileForm.querySelector('.popup__input_type_description');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const cardsList = document.querySelector('.places__list');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardPlaceInput = newCardForm.querySelector('.popup__input_type_url');
const profileEditBtn = document.querySelector('.profile__edit-button');
const newCardBtn = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImg = document.querySelector('.popup_type_image');
const closePopupBtns = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

const profile = {
  profileName: 'Жак-Ив Кусто',
  profileDescription: 'Исследователь океана'
};

const addCards = (cards) => {
  cards.forEach((cardData) => {
    const card = createCard(cardData, removeCard, handlePreviewPicture, likeCard);
    cardsList.append(card);
  });
};

getProfile(profile);
addCards(initialCards);

profileEditBtn.addEventListener('click', profilePopupHandler);
newCardBtn.addEventListener('click', newCardPopupHandler);
popups.forEach((popup) => popup.addEventListener('click', closePopupHandler));
closePopupBtns.forEach((btn) => btn.addEventListener('click', closePopupHandler));
profileForm.addEventListener('submit', editProfile);
newCardForm.addEventListener('submit', newCardFormSubmit);

export {
  profileForm,
  newCardForm,
  nameInput,
  descriptionInput,
  profileEditBtn,
  newCardBtn,
  cardsList,
  cardNameInput,
  cardPlaceInput,
  profile,
  profileTitle,
  profileDescription,
  popups,
  popupImg,
  popupEdit,
  popupNewCard
};