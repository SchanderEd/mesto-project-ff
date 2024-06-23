import { closePopup, openPopup } from "./modal.js";
import { popupConfirmDelete } from '../../index.js';
import { removeCard } from "../card/card.js";

const confirmDeleteHandler = (evt) => {
  closePopup(popupConfirmDelete);
  removeCard(evt);
};

const cardDeletePopupHandler = (evt) => {
  const cardItem = evt.target.closest('.card');
  const confirmBtn = popupConfirmDelete.querySelector('.popup__button');
  confirmBtn.id = cardItem.id;

  confirmBtn.addEventListener('click', confirmDeleteHandler);

  openPopup(popupConfirmDelete);
};

export { cardDeletePopupHandler };