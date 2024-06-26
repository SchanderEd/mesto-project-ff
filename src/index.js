import './index.css';
import { createCard, likeCard, removeCard } from './scripts/card/card';
import { closePopupHandler, openPopup, closePopup } from './scripts/modal/modal.js';
import { enableValidation, clearInputsError } from './scripts/validation/validation.js';
import { getCards, getProfile, newCardSubmit, updateAvatar, editProfile } from './scripts/api/api.js';

const profileForm = document.forms['edit-profile'];
const newAvatarForm = document.forms['new-avatar'];
const profileAvatar = document.querySelector('.profile__image');
const newCardForm = document.forms['new-place'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const urlAvatarInput = newAvatarForm.querySelector('.popup__input_type_url-avatar');
const descriptionInput = profileForm.querySelector('.popup__input_type_description');
const popupEdit = document.querySelector('.popup_type_edit');
const popupConfirmDelete = document.querySelector('.popup_type_confirm-delete');
const updateAvatarBtn = document.querySelector('.profile__image-update');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newAvatarPopup = document.querySelector('.popup_type_new-avatar');
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
const profile = getProfile();
const cards = getCards();

const settingsValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const renderCards = async (cardsData, profileData) => {
  const cards = await cardsData;
  const profile = await profileData;

  cards.forEach((cardData) => {
    const card = createCard(cardData, cardDeletePopupHandler, handlePreviewPicture, likeCard, profile);
    cardsList.append(card);
  });
};

const profilePopupHandler = () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  clearInputsError(settingsValidation, popupEdit);
  openPopup(popupEdit);
};

const editProfileHandler = async () => {
  const updatedProfile = await editProfile(nameInput, descriptionInput);
  renderProfile(updatedProfile);
};

const renderProfile = async (profileData) => {
  const profile = await profileData;
  
  nameInput.value = profile.name;
  descriptionInput.value = profile.about;

  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileAvatar.src = profile.avatar;
};

const handlePreviewPicture = (evt) => {
  const img = evt.target;

  const imgData = document.querySelector('.popup__image');
  imgData.src = img.src;

  const popupCaption = document.querySelector('.popup__caption');
  popupCaption.textContent = img.alt;

  openPopup(popupImg);
};

const newCardPopupHandler = () => {
  const form = popupNewCard.querySelector('.popup__form');
  form.reset();
  clearInputsError(settingsValidation, popupNewCard);
  openPopup(popupNewCard);
};

const newCardHandler = async () => {
  const newCard = await newCardSubmit(cardNameInput, cardPlaceInput);
  const profile = await getProfile();
  const card = createCard(newCard, cardDeletePopupHandler, handlePreviewPicture, likeCard, profile);
  cardsList.prepend(card);
};

const confirmDeleteHandler = async (evt) => {
  evt.target.textContent = 'Удаление...';
  const responseDelete = await removeCard(evt);

  if (responseDelete.ok) {
    closePopup(popupConfirmDelete);
    evt.target.textContent = 'Да';
  } else {
    evt.target.textContent = 'Ошибка удаления';
  };
};

const cardDeletePopupHandler = (evt) => {
  const cardItem = evt.target.closest('.card');
  const confirmBtn = popupConfirmDelete.querySelector('.popup__button');
  confirmBtn.id = cardItem.id;

  confirmBtn.addEventListener('click', confirmDeleteHandler);

  openPopup(popupConfirmDelete);
};

const updateAvatarHandler = async () => {
  const newAvatar = await updateAvatar(urlAvatarInput);
  renderNewAvatar(newAvatar);
};

const updateAvatarHandlerPopup = () => {
  const form = newAvatarPopup.querySelector('.popup__form');
  form.reset();
  clearInputsError(settingsValidation, newAvatarPopup);
  openPopup(newAvatarPopup);
};

const renderNewAvatar = (newAvatar) => {
  profileAvatar.src = newAvatar.avatar;
};

Promise.all([
  getProfile,
  getCards
])
  .then(() => {
    renderProfile(profile);
    renderCards(cards, profile);
  });

profileEditBtn.addEventListener('click', profilePopupHandler);
newCardBtn.addEventListener('click', newCardPopupHandler);
updateAvatarBtn.addEventListener('click', updateAvatarHandlerPopup);
popups.forEach((popup) => popup.addEventListener('click', closePopupHandler));
closePopupBtns.forEach((btn) => btn.addEventListener('click', closePopupHandler));
profileForm.addEventListener('submit', editProfileHandler);
newCardForm.addEventListener('submit', newCardHandler);
newAvatarForm.addEventListener('submit', updateAvatarHandler);

enableValidation(settingsValidation);