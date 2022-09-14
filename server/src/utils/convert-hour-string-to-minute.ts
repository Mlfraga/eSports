const convertHourStringToMinute = (time: string) => {
  const [hour, minutes] = time.split(':').map(Number);
  const timeInMinutes = Number(hour) * 60 + Number(minutes);

  console.log('minutes: ', minutes);
  console.log('hour: ', hour);
  console.log('timeInMinutes: ', timeInMinutes);
  
  return timeInMinutes;
};

export default convertHourStringToMinute;
