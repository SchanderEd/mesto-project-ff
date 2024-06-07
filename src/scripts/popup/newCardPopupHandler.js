import { popupNewCard } from "../../index.js";
import { openPopup } from "./modal.js";

const newCardPopupHandler = () => {
  const form = popupNewCard.querySelector('.popup__form');
  form.reset();
  openPopup(popupNewCard);
};

export { newCardPopupHandler };
