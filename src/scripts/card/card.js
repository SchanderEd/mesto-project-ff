const createCard = (cardData, removeCard, openPopup, profile) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector('.card');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const cardLikeElement = card.querySelector('.card__like');
  cardLikeElement.textContent = cardData.likes.length;

  card.id = cardData._id;

  const isLikedCard = cardData.likes.some((likedCard) => likedCard._id === profile._id);

  if (isLikedCard) {
    likeBtn.classList.add('card__like-button_is-active');
  };

  if (cardData.owner._id !== profile._id) {
    const deleteBtn = card.querySelector('.card__delete-button');
    card.removeChild(deleteBtn);
  } else {
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);
  };

  const cardImg = card.querySelector('.card__image');
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardImg.addEventListener('click', openPopup);

  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = cardData.name;

  return card;
};

const likeCard = (evt, profile, updateLike) => {
  const cardItem = evt.target.closest('.card');
  const likeElement = cardItem.querySelector('.card__like');
  const likeBtn = evt.target;

  if (likeBtn.classList.contains('card__like-button_is-active')) {
    profile
      .then((profile) => {
        updateLike(cardItem.id, 'DELETE', profile)
          .then((data) => likeElement.textContent = data.likes.length)
          .catch((err) => console.log(err))
      });
  } else {
    profile
      .then((profile) => {
        updateLike(cardItem.id, 'PUT', profile)
          .then((data) => likeElement.textContent = data.likes.length)
          .catch((err) => console.log(err))
      });
  };

  evt.target.classList.toggle('card__like-button_is-active');
};

const removeCard = (cardId) => {
  const card = document.getElementById(cardId);
  card.remove();
};

export { createCard, likeCard, removeCard };