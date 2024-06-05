import { newCardForm, cardsList, cardNameInput, cardPlaceInput } from "./domElements.js";
import { createCard, removeCard } from "./renderCards.js";
import { openPopupHandler } from "./popup.js";
import { likePlace } from "./like.js";

const newCardFormHandler = (evt) => {
  evt.preventDefault();

  const newCardName = cardNameInput.value;
  const newCardPlace = cardPlaceInput.value;

  const newCard = {
    name: newCardName,
    link: newCardPlace,
  };

  const card = createCard(newCard, removeCard, openPopupHandler, likePlace);
  cardsList.prepend(card);

  newCardForm.reset();
};

export { newCardFormHandler };