import './index.css';
import { initialCards } from './scripts/card/cards';
import { getPopup } from './scripts/popup/popup.js';
import { addCards } from './scripts/card/card.js';
import { getProfile } from './scripts/profile/profileEdit.js';
import './scripts/popup/popup.js';

const profileForm = document.forms['edit-profile'];
const newCardForm = document.forms['new-place'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const descriptionInput = profileForm.querySelector('.popup__input_type_description');
const cardsList = document.querySelector('.places__list');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardPlaceInput = newCardForm.querySelector('.popup__input_type_url');
const profileEditBtn = document.querySelector('.profile__edit-button');
const newCardBtn = document.querySelector('.profile__add-button');

let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');

profileEditBtn.addEventListener('click', getPopup);
newCardBtn.addEventListener('click', getPopup);

getProfile(nameInput, descriptionInput, profileTitle, profileDescription);
addCards(initialCards);

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
  profileTitle,
  profileDescription
};