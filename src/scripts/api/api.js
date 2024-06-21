const token = '87c75715-8e69-4ce9-8fec-d6e54f32a865';
const urlApi = 'https://nomoreparties.co/v1/wff-cohort-17/';

import { nameInput, descriptionInput } from "../../index.js";
import { closePopup } from "../popup/modal.js";
import { renderProfile } from "../profile/renderProfile.js";

const getCards = (renderCards) => {
  return fetch(`${urlApi}cards`, {
    headers: {
      authorization: token
    },
  })
    .then((res) => res.json())
    .then((cards) => renderCards(cards));
};

const getProfile = () => {
  return fetch(`${urlApi}users/me`, {
    headers: {
      authorization: token
    }
  })
    .then(res => res.json())
    .then((profileData) => {
      renderProfile(profileData);
    });
};

const editProfile = () => {
  renderSaving(true);

  return fetch(`${urlApi}users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: descriptionInput.value
    })
  }).then(() => {
    getProfile();
  })
    .finally(() => {
      renderSaving(false);
    })
};

const renderSaving = (isSaving) => {
  const popup = document.querySelector('.popup_is-opened');
  const saveBtn = popup.querySelector('.popup__button');

  if (isSaving) {
    saveBtn.textContent = 'Сохранение...';
  } else {
    saveBtn.textContent = 'Сохранить';
    closePopup(popup);
  };
};

export { getCards, getProfile, editProfile };