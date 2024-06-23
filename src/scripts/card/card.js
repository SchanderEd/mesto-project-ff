import { updateLike, deleteCard } from "../api/api";

const createCard = (cardData, removeCard, openPopup, likeCard, profile) => {
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

  likeBtn.addEventListener('click', likeCard);

  const cardImg = card.querySelector('.card__image');
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardImg.addEventListener('click', openPopup);

  if (cardData.owner._id !== profile._id) {
    const deleteBtn = card.querySelector('.card__delete-button');
    card.removeChild(deleteBtn);
  } else {
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);
  };

  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = cardData.name;

  return card;
};

const updateLikeElement = async (like, likeElement) => {
  const updatedLike = await like;
  likeElement.textContent = updatedLike.likes.length;
};

const likeCard = (evt) => {
  const cardItem = evt.target.closest('.card');
  const likeElement = cardItem.querySelector('.card__like');
  const likeBtn = evt.target;

  if (likeBtn.classList.contains('card__like-button_is-active')) {
    const removeLike = updateLike(cardItem.id, 'DELETE');
    updateLikeElement(removeLike, likeElement);
  } else {
    const addLike = updateLike(cardItem.id, 'PUT');
    updateLikeElement(addLike, likeElement);
  };
  evt.target.classList.toggle('card__like-button_is-active');
};

const removeCard = async (evt) => {
  const card = document.getElementById(evt.target.id);
  const deleteResponse = await deleteCard(card.id);
  deleteResponse.json();

  if (deleteResponse.ok) {
    card.remove();
  };

  return deleteResponse;
};

export { createCard, likeCard, removeCard };