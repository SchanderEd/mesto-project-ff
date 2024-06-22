import {
  nameInput,
  descriptionInput,
  profileTitle,
  profileDescription,
  profileAvatar,
} from '../../index.js';

const renderProfile = async (profileData) => {
  const profile = await profileData;
  
  nameInput.value = profile.name;
  descriptionInput.value = profile.about;

  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileAvatar.src = profile.avatar;
};

export { renderProfile };