import { cardsList } from "../../index.js";
import { getPopup } from "../popup/popup.js";

const createCard = (cardData, removeCard, openPopup, likeCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector('.card');

  const likeBtn = cardElement.querySelector('.card__like-button');
  likeBtn.addEventListener('click', likeCard);

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

const likeCard = (evt) => evt.target.classList.toggle('card__like-button_is-active');

const removeCard = (evt) => {
  const cardItem = evt.target.closest('.card');
  cardItem.remove();
};

const addCards = (cards) => {
  cards.forEach((cardData) => {
    const card = createCard(cardData, removeCard, getPopup, likeCard);
    cardsList.append(card);
  });
};

export { addCards, createCard, likeCard, removeCard };