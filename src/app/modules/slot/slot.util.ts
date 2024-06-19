import { TSlot } from './slot.interface';

export const convertTimeToMinutes = (time: string) => {
  const timeArray = time.split(':');
  const hoursToMinutes = Number(timeArray[0]) * 60;
  const minutes = Number(timeArray[1]);
  const totalMinutes = hoursToMinutes + minutes;
  return totalMinutes;
};

export const generateSlots = (payload: TSlot, durationPerSlot: number) => {
  const start = convertTimeToMinutes(payload.startTime);
  const end = convertTimeToMinutes(payload.endTime);
  const duration = Math.abs(end - start);
  const remainDuration = duration % durationPerSlot;
  const totalSlots = (duration - remainDuration) / durationPerSlot;
  return totalSlots;
};

export const generateEndTime = (startTime: string, durationPerSlot: number) => {
  const startTimeInMinutes = convertTimeToMinutes(startTime);
  const endTimeInMinutes = startTimeInMinutes + durationPerSlot;
  const endTimeMinutes = endTimeInMinutes % durationPerSlot;
  const endTimeHours = (endTimeInMinutes - endTimeMinutes) / durationPerSlot;
  const endTime = `${endTimeHours.toString().padStart(2, '0')}:${endTimeMinutes.toString().padStart(2, '0')}`;
  return endTime;
};
