import { newCardForm, cardsList, cardNameInput, cardPlaceInput } from "../../index.js";
import { createCard, likeCard, removeCard } from "./card.js";
import { getPopup } from "../popup/popup.js";

const newCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCardName = cardNameInput.value;
  const newCardPlace = cardPlaceInput.value;

  const newCard = {
    name: newCardName,
    link: newCardPlace,
  };

  const card = createCard(newCard, removeCard, getPopup, likeCard);
  cardsList.prepend(card);

  newCardForm.reset();
};

export { newCardFormSubmit };