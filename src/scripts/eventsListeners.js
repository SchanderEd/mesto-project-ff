import { getPopup } from './popups/popup.js';
import {
  profileEditBtn,
  newCardBtn,
} from './domElements.js';

profileEditBtn.addEventListener('click', getPopup);
newCardBtn.addEventListener('click', getPopup);