const removeCard = (evt) => {
  const cardItem = evt.target.closest('.card');
  cardItem.remove();
};

export { removeCard };