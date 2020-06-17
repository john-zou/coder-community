export const randomImage = () => {
  // get a random number from 170-320
  const randomNumber = Math.floor(Math.random() * 150 + 170);
  return `https://picsum.photos/${randomNumber}`;
};
