import { popupImg } from "../../index.js";
import { openPopup } from "./modal.js";

const handlePreviewPicture = (evt) => {
  const img = evt.target;

  const imgData = document.querySelector('.popup__image');
  imgData.src = img.src;

  const popupCaption = document.querySelector('.popup__caption');
  popupCaption.textContent = img.alt;

  openPopup(popupImg);
};

export { handlePreviewPicture };