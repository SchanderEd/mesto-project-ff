import { renderProfile } from "./renderProfile.js";
import { editProfile } from "../api/api.js";

const editProfileHandler = async () => {
  const updatedProfile = await editProfile();
  renderProfile(updatedProfile);
};

export { editProfileHandler };