import { AppError } from '../../errors/AppError';
import { Room } from '../room/room.model';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';
import {
  convertTimeToMinutes,
  generateTimeSlots,
  minutesToTime,
} from './slot.util';

const createSlots = async (payload: TSlot & { durationPerSlot: number }) => {
  const { startTime, endTime, durationPerSlot, ...restSlot } = payload;

  const newStart = convertTimeToMinutes(startTime);
  const newEnd = convertTimeToMinutes(endTime);

  const newStartTimeInMinutes = minutesToTime(newStart);
  const newEndTimeInMinutes = minutesToTime(newEnd);

  // find a room by _id
  const isRoomExists = await Room.findById(restSlot.room);

  // checking whether room is exists or not
  if (!isRoomExists) {
    throw new AppError(404, 'room', 'Room is not exists');
  }

  const givenDate = new Date(restSlot.date);

  // Current date (today's date)
  const currentDate = new Date();

  // Reset the time to midnight for accurate date comparison
  currentDate.setHours(0, 0, 0, 0);
  givenDate.setHours(0, 0, 0, 0);

  if (givenDate <= currentDate) {
    throw new AppError(422, 'date', 'Date must greater than current date');
  }

  // checking that starttime is grater than or equal end time or not
  if (newStart >= newEnd) {
    throw new AppError(
      422,
      'startTime, endTime',
      'Start time must less than to end time',
    );
  }

  // checking that duration between starttime & end time is less than minimum duration
  if (newEnd - newStart < durationPerSlot) {
    throw new AppError(
      422,
      'startTime, endTime',
      `Duration between start & end time must grater than or equal duration:${durationPerSlot} minutes`,
    );
  }

  const existingSlots = await Slot.find({
    room: restSlot.room,
    date: restSlot.date,
    $or: [
      {
        startTime: { $lte: newStartTimeInMinutes },
        endTime: { $gt: newStartTimeInMinutes, $lte: newEndTimeInMinutes },
      },
      {
        endTime: { $gte: newEndTimeInMinutes },
        startTime: { $lt: newEndTimeInMinutes, $gte: newStartTimeInMinutes },
      },
      {
        startTime: { $lte: newStartTimeInMinutes },
        endTime: { $gte: newEndTimeInMinutes },
      },
      {
        startTime: { $gt: newStartTimeInMinutes },
        endTime: { $lt: newEndTimeInMinutes },
      },
    ],
    isDeleted: false,
  });

  // checking slots on the same date also on the same time is found any data or not
  if (existingSlots && existingSlots?.length !== 0) {
    throw new AppError(
      409,
      'date, startTime, endTime',
      'There are few slots already exists within this given time on this date',
    );
  }

  const generateSlotsTimes = generateTimeSlots(
    startTime,
    endTime,
    durationPerSlot,
  );

  const newSlots: TSlot[] = generateSlotsTimes.map((times) => ({
    ...restSlot,
    startTime: times?.startTime,
    endTime: times?.endTime,
  }));

  // create slots
  const result = await Slot.create(newSlots);

  return result;
};

const updateSlot = async (id: string, updateInfo: Partial<TSlot>) => {
  const { date, startTime, endTime, room } = updateInfo;
  const newStart = convertTimeToMinutes(startTime as string);
  const newEnd = convertTimeToMinutes(endTime as string);
  const newStartTimeInMinutes = minutesToTime(newStart);
  const newEndTimeInMinutes = minutesToTime(newEnd);
  const givenDate = new Date(date as string);

  // Current date (today's date)
  const currentDate = new Date();

  // Reset the time to midnight for accurate date comparison
  currentDate.setHours(0, 0, 0, 0);
  givenDate.setHours(0, 0, 0, 0);

  if (givenDate <= currentDate) {
    throw new AppError(422, 'date', 'Date must greater than current date');
  }

  // checking that starttime is grater than or equal end time or not
  if (newStart >= newEnd) {
    throw new AppError(
      422,
      'startTime, endTime',
      'Start time must less than to end time',
    );
  }

  const existingSlots = await Slot.find({
    _id: { $nin: [id] },
    room,
    date,
    $or: [
      {
        startTime: { $lte: newStartTimeInMinutes },
        endTime: { $gt: newStartTimeInMinutes, $lte: newEndTimeInMinutes },
      },
      {
        endTime: { $gte: newEndTimeInMinutes },
        startTime: { $lt: newEndTimeInMinutes, $gte: newStartTimeInMinutes },
      },
      {
        startTime: { $lte: newStartTimeInMinutes },
        endTime: { $gte: newEndTimeInMinutes },
      },
      {
        startTime: { $gt: newStartTimeInMinutes },
        endTime: { $lt: newEndTimeInMinutes },
      },
    ],
    isDeleted: false,
  });

  // checking slots on the same date also on the same time is found any data or not
  if (existingSlots && existingSlots?.length !== 0) {
    throw new AppError(
      409,
      'date, startTime, endTime',
      'There are few slots already exists within this given time on this date',
    );
  }

  const result = await Slot.findOneAndUpdate(
    { _id: id, isBooked: false, isDeleted: false },
    {
      date,
      startTime: newStartTimeInMinutes,
      endTime: newEndTimeInMinutes,
    },
    { new: true },
  );

  if (!result) {
    throw new AppError(404, 'slot', 'Slot is already booked or deleted');
  }

  return result;
};

const getSlots = async (query: Record<string, unknown>) => {
  const objQuery: Record<string, unknown> = {};

  // if query.date comes from query then add it to objQuery
  if (query?.date) {
    objQuery.date = query.date;
  }
  // if query.roomId comes from query then add it to objQuery
  if (query?.roomId) {
    objQuery.room = query.roomId;
  }

  // find slot by given query and isBooked: false, isDeleted: false with populating room
  const result = await Slot.find({
    ...objQuery,
    isBooked: false,
    isDeleted: false,
  })
    .populate('room')
    .sort('-createdAt');

  return result;
};

const getAllSlots = async (query: Record<string, unknown>) => {
  const result = await Slot.find({
    ...query,
    isDeleted: false,
  })
    .populate('room')
    .sort('-createdAt');
  return result;
};

const deleteSlot = async (id: string) => {
  const result = await Slot.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new AppError(404, '_id', 'Slot is not found for delete');
  }
  return result;
};

export const SlotServices = {
  createSlots,
  getSlots,
  getAllSlots,
  deleteSlot,
  updateSlot,
};
