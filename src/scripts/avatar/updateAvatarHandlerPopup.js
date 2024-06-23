import { newAvatarPopup } from "../..";
import { openPopup } from "../popup/modal";
import { clearInputsError } from "../validation/validation";

const updateAvatarHandlerPopup = () => {
  const form = newAvatarPopup.querySelector('.popup__form');
  form.reset();
  clearInputsError(newAvatarPopup);
  openPopup(newAvatarPopup);
};

export { updateAvatarHandlerPopup };