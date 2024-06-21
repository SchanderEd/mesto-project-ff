import {
  nameInput,
  descriptionInput,
  profileTitle,
  profileDescription,
  profileAvatar,
} from '../../index.js';

const renderProfile = (profile) => {
  nameInput.value = profile.name;
  descriptionInput.value = profile.about;

  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileAvatar.src = profile.avatar;
};

export { renderProfile };