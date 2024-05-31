const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const descriptionInput = profileForm.querySelector('.popup__input_type_description');

let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');

const editProfile = (evt) => {
  const popup = profileForm.closest('.popup_is-opened');
  evt.preventDefault();
  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  popup.classList.remove('popup_is-opened');
  profileForm.reset();
};

profileForm.addEventListener('submit', editProfile);