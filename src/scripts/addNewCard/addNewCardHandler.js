import { cardsList } from "../../index.js";
import { getProfile, newCardSubmit } from "../api/api.js";
import { createCard, removeCard, likeCard } from "../card/card.js";
import { handlePreviewPicture } from "../popup/previewImgHandler.js";

const newCardHandler = async () => {
  const newCard = await newCardSubmit();
  const profile = await getProfile();
  const card = createCard(newCard, removeCard, handlePreviewPicture, likeCard, profile);
  cardsList.prepend(card);
};

export { newCardHandler };