const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17/',
  headers: {
    authorization: '87c75715-8e69-4ce9-8fec-d6e54f32a865',
    'Content-Type': 'application/json'
  }
};

import { nameInput, descriptionInput, cardsList, cardNameInput, cardPlaceInput } from "../../index.js";
import { renderProfile } from "../profile/renderProfile.js";
import { renderSaving } from "../renderSaving/renderSaving.js";
import { createCard, likeCard, removeCard } from "../card/card.js";
import { handlePreviewPicture } from "../popup/previewImgHandler.js";

const getCards = () => {
  return fetch(`${config.baseUrl}cards`, {
    headers: {
      authorization: config.headers.authorization
    },
  })
    .then((res) => res.json())
    .then((cards) => cards);
};

const getProfile = async () => {
  return fetch(`${config.baseUrl}users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(res => res.json())
    .then((profileData) => profileData);
};

const editProfile = () => {
  renderSaving(true);

  return fetch(`${config.baseUrl}users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: descriptionInput.value
    })
  })
    .then(() => {
      const updatedProfile = getProfile();
      renderProfile(updatedProfile);
    })
    .finally(() => {
      renderSaving(false);
    })
};

const newCardSubmit = () => {
  renderSaving(true);

  return fetch(`${config.baseUrl}cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardNameInput.value,
      link: cardPlaceInput.value
    })
  })
    .then((res) => res.json())
    .then((cardData) => {
      const newCard = createCard(cardData, removeCard, handlePreviewPicture, likeCard, profile);
      cardsList.prepend(newCard);
    })
    .finally(() => {
      renderSaving(false);
    })
};

const updateLike = (cardId, cardLikeElement, method) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: config.headers.authorization
    },
    body: JSON.stringify({
      profile
    })
  }).then((res) => res.json())
    .then((card) => {
      cardLikeElement.textContent = card.likes.length;
    });
};

const deleteCard = (card, cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(() => {
    card.remove();
  })
};

const profile = getProfile();
const cards = getCards();

export { getCards, getProfile, editProfile, newCardSubmit, deleteCard, profile, cards, updateLike };