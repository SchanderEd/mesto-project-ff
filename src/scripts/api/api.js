const token = '87c75715-8e69-4ce9-8fec-d6e54f32a865';
const urlApi = 'https://nomoreparties.co/v1/wff-cohort-17/';

import { nameInput, descriptionInput, cardsList, cardNameInput, cardPlaceInput } from "../../index.js";
import { renderProfile } from "../profile/renderProfile.js";
import { renderSaving } from "../renderSaving/renderSaving.js";
import { createCard, likeCard, removeCard } from "../card/card.js";
import { handlePreviewPicture } from "../popup/previewImgHandler.js";

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
  })
    .then(() => {
      getProfile();
    })
    .finally(() => {
      renderSaving(false);
    })
};

const newCardSubmit = () => {
  renderSaving(true);

  return fetch(`${urlApi}cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardNameInput.value,
      link: cardPlaceInput.value
    })
  })
    .then((res) => res.json())
    .then((cardData) => {
      const newCard = createCard(cardData, removeCard, handlePreviewPicture, likeCard);
      cardsList.prepend(newCard);
    })
    .finally(() => {
      renderSaving(false);
    })
};

export { getCards, getProfile, editProfile, newCardSubmit };