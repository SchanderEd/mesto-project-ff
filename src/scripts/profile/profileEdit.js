import {
  nameInput,
  descriptionInput,
  profileTitle,
  profileDescription,
  profile
} from '../../index.js';

const getProfile = (profile) => {
  nameInput.value = profile.profileName;
  descriptionInput.value = profile.profileDescription;

  profileTitle.textContent = profile.profileName;
  profileDescription.textContent = profile.profileDescription;
};

const editProfile = (evt) => {
  evt.preventDefault();

  profile.profileName = nameInput.value;
  profile.profileDescription = descriptionInput.value;

  getProfile(profile);
};

export { getProfile, editProfile };