import { updateAvatar } from "../api/api";
import { renderNewAvatar } from "./renderNewAvatar";

const updateAvatarHandler = async () => {
  const newAvatar = await updateAvatar();
  renderNewAvatar(newAvatar);
};

export { updateAvatarHandler };