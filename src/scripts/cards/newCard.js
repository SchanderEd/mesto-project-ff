import { newCardForm, cardsList, cardNameInput, cardPlaceInput } from "../domElements.js";
import { createCard } from "./renderCards.js";
import { removeCard } from "./removeCard.js";
import { getPopup } from "../popups/popup.js";
import { likePlace } from "../like/like.js";

const newCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCardName = cardNameInput.value;
  const newCardPlace = cardPlaceInput.value;

  const newCard = {
    name: newCardName,
    link: newCardPlace,
  };

  const card = createCard(newCard, removeCard, getPopup, likePlace);
  cardsList.prepend(card);

  newCardForm.reset();
};

export { newCardFormSubmit };