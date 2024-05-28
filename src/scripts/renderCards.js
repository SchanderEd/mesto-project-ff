import { initialCards } from "./cards.js";

const cardsList = document.querySelector('.places__list');

const removeCard = (evt) => {
  const cardItem = evt.target.closest('.card');
  cardItem.remove();
};

const renderCard = (cardData, removeCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  const card = cardElement.querySelector('.card');

  const cardImg = card.querySelector('.card__image');
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', removeCard);

  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = cardData.name;

  return card;
};

initialCards.forEach((cardData) => {
  const card = renderCard(cardData, removeCard);
  cardsList.append(card);
});