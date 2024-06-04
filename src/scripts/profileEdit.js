import {
  nameInput,
  descriptionInput,
  profileTitle,
  profileDescription
} from './domElements.js';

const inputValue = (inputName, inputDescr, profileName, profileDescr) => {
  inputName.value = profileName.textContent;
  inputDescr.value = profileDescr.textContent;
};

const editProfile = (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  inputValue(nameInput, descriptionInput, profileTitle, profileDescription);
};

inputValue(nameInput, descriptionInput, profileTitle, profileDescription);

export { inputValue, editProfile };