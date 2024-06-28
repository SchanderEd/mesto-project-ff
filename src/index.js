import './index.css';
import { createCard, likeCard, removeCard } from './scripts/card/card';
import { closePopupHandler, openPopup, closePopup } from './scripts/modal/modal.js';
import { enableValidation, clearInputsError } from './scripts/validation/validation.js';
import { getCards, getProfile, newCardSubmit, updateAvatar, editProfile, updateLike, deleteCard } from './scripts/api/api.js';
import { renderLoading } from './scripts/util/util.js';

const profileForm = document.forms['edit-profile'];
const newAvatarForm = document.forms['new-avatar'];
const confirmDeleteForm = document.forms['confirm-delete'];
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
const imgData = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const profileEditBtn = document.querySelector('.profile__edit-button');
const newCardBtn = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImg = document.querySelector('.popup_type_image');
const closePopupBtns = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const profile = getProfile()
  .then((profile) => profile)
  .catch((err) => console.log(err));
const cards = getCards();

const settingsValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  disabledButton: 'button_inactive'
};

const defultTextSubmitter = {
  saveSubmitter: 'Сохранить',
  confirmSubmitter: 'Да'
};

const renderCards = (cardsData) => {
  cardsData
    .then((cards) => {
      profile.then((profile) => {
        cards.forEach((cardData) => {
          const card = createCard(cardData, cardDeletePopupHandler, handlePreviewPicture, profile);
          addCardLikeListener(card, likeBtnHandler);
          cardsList.append(card);
        });
      });
    })
    .catch((err) => console.log(err))
};

const renderProfile = (profileData) => {
  profileData.then((profile) => {
    nameInput.value = profile.name;
    descriptionInput.value = profile.about;

    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileAvatar.src = profile.avatar;
  })
};

const renderNewAvatar = (newAvatar) => {
  profileAvatar.src = newAvatar.avatar;
};

const onError = (evt, defultText, err) => {
  const errorElement = evt.submitter;
  errorElement.textContent = 'Что-то пошло не так :(';

  setTimeout(() => {
    errorElement.textContent = defultText;
  }, 2000);

  console.log(err)
};

const profilePopupHandler = () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  clearInputsError(settingsValidation, popupEdit);
  openPopup(popupEdit);
};

const updateAvatarHandlerPopup = () => {
  const form = newAvatarPopup.querySelector('.popup__form');
  form.reset();
  clearInputsError(settingsValidation, newAvatarPopup);
  openPopup(newAvatarPopup);
};

const newCardPopupHandler = () => {
  const form = popupNewCard.querySelector('.popup__form');
  form.reset();
  clearInputsError(settingsValidation, popupNewCard);
  openPopup(popupNewCard);
};

const cardDeletePopupHandler = (evt) => {
  const cardItem = evt.target.closest('.card');
  const confirmBtn = popupConfirmDelete.querySelector('.popup__button');
  confirmBtn.id = cardItem.id;

  confirmDeleteForm.addEventListener('submit', confirmDeleteHandler);

  openPopup(popupConfirmDelete);
};

const editProfileHandler = (evt) => {
  const editedProfile = editProfile(nameInput, descriptionInput);

  renderLoading(true);

  editedProfile
    .then(() => {
      renderProfile(editedProfile);
      renderLoading(false, closePopup);
    })
    .catch((err) => onError(evt, defultTextSubmitter.saveSubmitter, err));
};

const likeBtnHandler = (evt) => {
  likeCard(evt, profile, updateLike);
};

const addCardLikeListener = (card, listenerLike) => {
  const likeBtn = card.querySelector('.card__like-button');
  likeBtn.addEventListener('click', listenerLike);
};

const newCardHandler = (evt) => {
  renderLoading(true);

  newCardSubmit(cardNameInput, cardPlaceInput)
    .then((newCard) => {
      profile.then((profile) => {
        const card = createCard(newCard, cardDeletePopupHandler, handlePreviewPicture, profile);
        addCardLikeListener(card, likeBtnHandler);

        cardsList.prepend(card);

        renderLoading(false, closePopup);
      })
    })
    .catch((err) => onError(evt, defultTextSubmitter.saveSubmitter, err))
};

const updateAvatarHandler = (evt) => {
  renderLoading(true);

  updateAvatar(urlAvatarInput)
    .then((newAvatar) => {
      renderNewAvatar(newAvatar);

      renderLoading(false, closePopup);
    })
    .catch((err) => onError(evt, defultTextSubmitter.saveSubmitter, err))
};

const confirmDeleteHandler = (evt) => {
  evt.preventDefault();
  evt.submitter.textContent = 'Удаление...';
  const responseDelete = deleteCard(evt.submitter.id);

  responseDelete
    .then(() => {
      removeCard(evt.submitter.id);
      closePopup(popupConfirmDelete);
    })
    .catch((err) => onError(evt, defultTextSubmitter.confirmSubmitter, err));
};

const handlePreviewPicture = (evt) => {
  const img = evt.target;
  imgData.src = img.src;
  imgData.alt = img.alt;

  popupCaption.textContent = img.alt;

  openPopup(popupImg);
};

Promise.all([
  getProfile,
  getCards
])
  .then(() => {
    renderProfile(profile);
    renderCards(cards, profile);
  })
  .catch((err) => console.log(err));

profileEditBtn.addEventListener('click', profilePopupHandler);
newCardBtn.addEventListener('click', newCardPopupHandler);
updateAvatarBtn.addEventListener('click', updateAvatarHandlerPopup);
popups.forEach((popup) => popup.addEventListener('click', closePopupHandler));
closePopupBtns.forEach((btn) => btn.addEventListener('click', closePopupHandler));
profileForm.addEventListener('submit', editProfileHandler);
newCardForm.addEventListener('submit', newCardHandler);
newAvatarForm.addEventListener('submit', updateAvatarHandler);

enableValidation(settingsValidation);