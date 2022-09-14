const convertHourStringToMinute = (time: string) => {
  const [hour, minutes] = time.split(':').map(Number);
  const timeInMinutes = Number(hour) * 60 + Number(minutes);

  return timeInMinutes;
};

export default convertHourStringToMinute;
