import {
  nameInput,
  descriptionInput,
  profileTitle,
  profileDescription
} from './domElements.js';

const profileInputValue = (inputName, inputDescr, profileName, profileDescr) => {
  inputName.value = profileName.textContent;
  inputDescr.value = profileDescr.textContent;
};

const editProfile = (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  profileInputValue(nameInput, descriptionInput, profileTitle, profileDescription);
};

profileInputValue(nameInput, descriptionInput, profileTitle, profileDescription);

export { profileInputValue, editProfile };