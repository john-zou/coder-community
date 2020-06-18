export const randomImage = () => {
  // get a random number from 200-350
  const randomNumber = Math.floor(Math.random() * 150 + 200);
  return `https://picsum.photos/${randomNumber}`;
};

export const randomBackgroundImage = () => {
  // get a random number from 1000-1400
  const randomNumber = Math.floor(Math.random() * 400 + 1000);
  return `https://picsum.photos/${randomNumber}`;
};
