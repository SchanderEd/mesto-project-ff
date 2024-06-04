import { openPopupHandler } from './popup.js';
import {
  profileEditBtn,
  newCardBtn,
  imgBtns,
} from './domElements.js';


profileEditBtn.addEventListener('click', openPopupHandler);
newCardBtn.addEventListener('click', openPopupHandler);
imgBtns.forEach((img) => img.addEventListener('click', openPopupHandler));