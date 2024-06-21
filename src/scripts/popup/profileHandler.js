import { descriptionInput, nameInput, popupEdit, profileDescription, profileTitle } from "../../index.js";
import { openPopup } from "./modal.js";
import { clearInputsError } from "../validation/validation.js";

const profilePopupHandler = () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  clearInputsError(popupEdit);
  openPopup(popupEdit);
};

export { profilePopupHandler };