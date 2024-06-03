const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const descriptionInput = profileForm.querySelector('.popup__input_type_description');

const profileEditBtn = document.querySelector('.profile__edit-button');
const newCardBtn = document.querySelector('.profile__add-button');
const imgBtns = document.querySelectorAll('.card__image');

let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');

export {
  profileForm,
  nameInput,
  descriptionInput,
  profileEditBtn,
  newCardBtn,
  imgBtns,
  profileTitle,
  profileDescription
};