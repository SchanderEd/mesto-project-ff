import {
  nameInput,
  descriptionInput,
  profileTitle,
  profileDescription
} from '../../index.js';

const getProfile = (inputName, inputDescr, profileName, profileDescr) => {
  inputName.value = profileName.textContent;
  inputDescr.value = profileDescr.textContent;
};

const editProfile = (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  getProfile(nameInput, descriptionInput, profileTitle, profileDescription);
};

export { getProfile, editProfile };