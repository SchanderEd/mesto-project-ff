const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17/',
  headers: {
    authorization: '87c75715-8e69-4ce9-8fec-d6e54f32a865',
    'Content-Type': 'application/json'
  }
};

import { nameInput, descriptionInput, cardNameInput, cardPlaceInput, urlAvatarInput } from "../../index.js";
import { renderSaving } from "../renderSaving/renderSaving.js";

const checkResponse = (resStatus) => {
  if (resStatus.ok) {
    return resStatus.json()
  };

  return Promise.reject(`Ошибка: ${resStatus.status}`);
};

const getCards = () => {
  return fetch(`${config.baseUrl}cards`, {
    headers: {
      authorization: config.headers.authorization
    },
  })
    .then((res) => checkResponse(res))
    .then((cards) => cards)
    .catch((err) => console.log(err))
};

const getProfile = () => {
  return fetch(`${config.baseUrl}users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then((res) => checkResponse(res))
    .then((profileData) => profileData)
    .catch((err) => console.log(err));
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
      return updatedProfile;
    })
    .catch((err) => console.log(err))
    .finally(() => renderSaving(false))
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
    .then((res) => checkResponse(res))
    .then((cardData) => cardData)
    .catch((err) => console.log(err))
    .finally(() => renderSaving(false))
};

const updateLike = async (cardId, method) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: config.headers.authorization
    },
    body: JSON.stringify({
      profile
    })
  }).then((res) => checkResponse(res))
    .then((card) => card)
    .catch((err) => console.log(err));
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
    },
  });
};

const updateAvatar = () => {
  renderSaving(true);
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: urlAvatarInput.value
    })
  }).then((res) => checkResponse(res))
    .then((newAvatar) => newAvatar)
    .catch((err) => console.log(err))
    .finally(() => renderSaving(false));
};

const profile = getProfile();
const cards = getCards();

export {
  getCards,
  getProfile,
  editProfile,
  newCardSubmit,
  deleteCard,
  profile,
  cards,
  updateLike,
  updateAvatar
};