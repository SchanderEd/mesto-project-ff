import { profileAvatar } from "../..";

const renderNewAvatar = (newAvatar) => {
  profileAvatar.src = newAvatar.avatar;
};

export { renderNewAvatar };