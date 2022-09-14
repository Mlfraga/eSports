const convertMinutesToHourString = (minutes: number) => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;

  return `${String(hour).padStart(2, '0')}:${String(minute).padEnd(2, '0')}`;
};

export default convertMinutesToHourString;
