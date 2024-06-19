import { AppError } from '../../errors/AppError';
import { Room } from '../room/room.model';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';
import {
  generateSlots,
  generateEndTime,
  convertTimeToMinutes,
} from './slot.util';

const createSlots = async (payload: TSlot) => {
  const durationPerSlot = 60; // Assuming

  const { startTime, endTime, ...restSlot } = payload;

  const isRoomExists = await Room.findById(restSlot.room);

  if (!isRoomExists) {
    throw new AppError(404, 'room', 'Room is not exists');
  }

  if (startTime >= endTime) {
    throw new AppError(406, '', 'Start time must less than to end time');
  }

  if (
    convertTimeToMinutes(endTime) - convertTimeToMinutes(startTime) <
    durationPerSlot
  ) {
    throw new AppError(
      406,
      '',
      'Duration between start & end time must grater than or equal minimum duration 60 minutes',
    );
  }

  const existingSlots = await Slot.find({
    room: restSlot.room,
    date: restSlot.date,
    startTime: { $gte: startTime },
    endTime: { $lte: endTime },
  });

  if (existingSlots && existingSlots.length !== 0) {
    throw new AppError(
      406,
      '',
      'There are few slots already exists within this given time on the same date',
    );
  }

  const newSlots = [];

  const totalSlots = generateSlots(payload, durationPerSlot);

  let timeStart = startTime;

  for (let i = 0; i < totalSlots; i++) {
    const timeEnd = generateEndTime(timeStart, durationPerSlot);
    newSlots.push({ ...restSlot, startTime: timeStart, endTime: timeEnd });
    timeStart = timeEnd;
  }

  const result = await Slot.create(newSlots);

  return result;
};

const getSlots = async (query: Record<string, unknown>) => {
  const objQuery: Record<string, unknown> = {};

  if (query?.date) {
    objQuery.date = query.date;
  }

  if (query?.roomId) {
    objQuery.room = query.roomId;
  }

  const result = await Slot.find(objQuery).populate('room');

  return result;
};

export const SlotServices = {
  createSlots,
  getSlots,
};
