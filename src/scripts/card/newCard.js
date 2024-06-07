import { cardsList, cardNameInput, cardPlaceInput } from "../../index.js";
import { createCard, likeCard, removeCard } from "./card.js";
import { handlePreviewPicture } from "../popup/previewImgHandler.js";

const newCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCardName = cardNameInput.value;
  const newCardPlace = cardPlaceInput.value;

  const newCard = {
    name: newCardName,
    link: newCardPlace,
  };

  const card = createCard(newCard, removeCard, handlePreviewPicture, likeCard);
  cardsList.prepend(card);
};

export { newCardFormSubmit };