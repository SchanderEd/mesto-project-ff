import { initialCards } from "./cards.js";
import { cardsList } from "../domElements.js";
import { getPopup } from "../popups/popup.js";
import { likePlace } from "../like/like.js";
import { removeCard } from "./removeCard.js";

const createCard = (cardData, removeCard, openPopup, likePlace) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector('.card');

  const likeBtn = cardElement.querySelector('.card__like-button');
  likeBtn.addEventListener('click', likePlace);

  const cardImg = card.querySelector('.card__image');
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardImg.addEventListener('click', openPopup);

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', removeCard);

  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = cardData.name;

  return card;
};

const addCards = (cards) => {
  cards.forEach((cardData) => {
    const card = createCard(cardData, removeCard, getPopup, likePlace);
    cardsList.append(card);
  });
};

addCards(initialCards);

export { createCard };