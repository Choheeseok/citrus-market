const timeDifference = (after: Date, before: Date): string => {
  const difference = after.getTime() - before.getTime();

  const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
  if (months > 0) return `${months}개월`;

  const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
  if (weeks > 0) return `${weeks}주`;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  if (days > 0) return `${days}일`;

  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  if (hours > 0) return `${hours}시간`;

  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  if (minutes > 0) return `${minutes}분`;

  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  return `${seconds}초`;
};

const dateFormat = (date: Date): string => {
  return `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
};

export = { timeDifference, dateFormat };
