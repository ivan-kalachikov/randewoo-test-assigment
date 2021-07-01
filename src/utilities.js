const getFormattedDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString('ru-RU')} / ${date.toLocaleTimeString('ru-RU')}`;
};

export default getFormattedDate;
