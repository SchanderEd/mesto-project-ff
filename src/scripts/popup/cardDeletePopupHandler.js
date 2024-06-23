import { closePopup, openPopup } from "./modal.js";
import { popupConfirmDelete } from '../../index.js';
import { removeCard } from "../card/card.js";

const confirmDeleteHandler = async (evt) => {
  evt.target.textContent = 'Удаление...';
  const responseDelete = await removeCard(evt);

  if (responseDelete.ok) {
    closePopup(popupConfirmDelete);
    evt.target.textContent = 'Да';
  } else {
    evt.target.textContent = 'Ошибка удаления';
  };
};

const cardDeletePopupHandler = (evt) => {
  const cardItem = evt.target.closest('.card');
  const confirmBtn = popupConfirmDelete.querySelector('.popup__button');
  confirmBtn.id = cardItem.id;

  confirmBtn.addEventListener('click', confirmDeleteHandler);

  openPopup(popupConfirmDelete);
};

export { cardDeletePopupHandler };