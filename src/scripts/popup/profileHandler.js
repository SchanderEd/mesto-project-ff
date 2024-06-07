import { profile, popupEdit } from "../../index.js";
import { getProfile } from "../profile/profileEdit.js";
import { openPopup } from "./modal.js";

const profilePopupHandler = () => {
  getProfile(profile);
  openPopup(popupEdit);
};

export { profilePopupHandler };