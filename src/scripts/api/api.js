const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17/',
  headers: {
    authorization: '87c75715-8e69-4ce9-8fec-d6e54f32a865',
    'Content-Type': 'application/json'
  }
};

const checkResponse = (resStatus) => {
  if (resStatus.ok) {
    return Promise.resolve(resStatus.json());
  };

  return Promise.reject(`Ошибка: ${resStatus.status}`);
};

const getCards = () => {
  return fetch(`${config.baseUrl}cards`, {
    headers: {
      authorization: config.headers.authorization
    },
  }).then((res) => checkResponse(res))
};

const getProfile = () => {
  return fetch(`${config.baseUrl}users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  }).then((res) => checkResponse(res))
};

const editProfile = (nameInput, descriptionInput) => {
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
  }).then((res) => checkResponse(res))
};

const newCardSubmit = (cardNameInput, cardPlaceInput) => {
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
  }).then((res) => checkResponse(res))
};

const updateLike = (cardId, method, profile) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: config.headers.authorization
    },
    body: JSON.stringify({
      profile
    })
  }).then((res) => checkResponse(res))
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => checkResponse(res));
};

const updateAvatar = (urlAvatarInput) => {
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
};

export {
  getCards,
  getProfile,
  editProfile,
  newCardSubmit,
  deleteCard,
  updateLike,
  updateAvatar,
  checkResponse
};