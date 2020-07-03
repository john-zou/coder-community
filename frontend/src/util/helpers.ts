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

export const howLongAgo = (unixTime) => {
  const diff = Date.now() - unixTime;
  if (diff < 60 * 1000) {
    return "Just now";
  }

  const minutes = Math.round(diff / 60000);

  if (minutes === 1) {
    return "1 minute ago";
  }
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }

  const hours = Math.round(minutes / 60);
  if (hours === 1) {
    return "1 hour ago";
  }
  if (hours < 24) {
    return `${hours} hours ago`;
  }

  const days = Math.round(hours / 24);
  if (days === 1) {
    return "1 day ago";
  }
  if (days < 7) {
    return `${days} days ago`;
  }

  const weeks = Math.round(days / 7);
  if (weeks === 1) {
    return "1 week ago";
  }
  if (weeks < 4) {
    return `${weeks} weeks ago`;
  }

  const months = Math.round(weeks / 4);
  if (months === 1) {
    return "1 month ago";
  }
  if (months < 12) {
    return `${months} months ago`;
  }

  const years = Math.round(months / 12);
  if (years === 1) {
    return "1 year ago";
  }
  return `${years} years ago`;
};

