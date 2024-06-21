import { popupNewCard } from "../../index.js";
import { clearInputsError } from "../validation/validation.js";
import { openPopup } from "./modal.js";

const newCardPopupHandler = () => {
  const form = popupNewCard.querySelector('.popup__form');
  form.reset();
  clearInputsError(popupNewCard);
  openPopup(popupNewCard);
};

export { newCardPopupHandler };
