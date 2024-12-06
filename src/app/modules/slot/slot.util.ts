export const convertTimeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const minutesToTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  // Ensure hours and minutes are always two digits
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(remainingMinutes).padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
};

export const generateTimeSlots = (
  startTime: string,
  endTime: string,
  durationPerSlot: number,
) => {
  const startInMinutes = convertTimeToMinutes(startTime);
  const endInMinutes = convertTimeToMinutes(endTime);

  const timeSlots = [];
  let currentStartTime = startInMinutes;
  while (currentStartTime + durationPerSlot <= endInMinutes) {
    const currentEndTime = currentStartTime + durationPerSlot;
    timeSlots.push({
      startTime: minutesToTime(currentStartTime),
      endTime: minutesToTime(currentEndTime),
    });
    currentStartTime = currentEndTime;
  }

  const remainingTime = endInMinutes - currentStartTime;
  if (remainingTime > 0) {
    timeSlots.push({
      startTime: minutesToTime(currentStartTime),
      endTime: minutesToTime(endInMinutes),
    });
  }

  return timeSlots;
};
