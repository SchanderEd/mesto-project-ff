import { closePopup, openPopup } from './popup.js';
import { editProfile } from './profileEdit.js';
import {
  profileEditBtn,
  newCardBtn,
  profileForm,
  imgBtns,
} from './domElements.js';


profileEditBtn.addEventListener('click', openPopup);
newCardBtn.addEventListener('click', openPopup);
imgBtns.forEach((img) => img.addEventListener('click', openPopup));

profileForm.addEventListener('submit', editProfile);