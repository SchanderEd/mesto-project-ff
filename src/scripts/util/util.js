const renderLoading = (isSaving, closePopup) => {
  const popup = document.querySelector('.popup_is-opened');
  const saveBtn = popup.querySelector('.popup__button');

  if (isSaving) {
    saveBtn.textContent = 'Сохранение...';
  } else {
    saveBtn.textContent = 'Сохранить';
    closePopup(popup);
  };
};

export { renderLoading };