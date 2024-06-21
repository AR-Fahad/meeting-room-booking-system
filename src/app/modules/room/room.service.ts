import { AppError } from '../../errors/AppError';
import { TRoom } from './room.interface';
import { Room } from './room.model';

const createRoom = async (payload: TRoom) => {
  // post a room
  const result = await Room.create(payload);
  return result;
};

const getAllRooms = async () => {
  // get all rooms
  const result = await Room.find();
  return result;
};

const getRoom = async (id: string) => {
  // get a room
  const result = await Room.findById(id);

  // check whether room is exists or not
  if (!result) {
    throw new AppError(404, '_id', 'Room is not found');
  }

  // check whether room is softly deleted or not
  if (result?.isDeleted) {
    throw new AppError(400, 'isDeleted', 'This room is already deleted');
  }

  return result;
};

const updateRoom = async (id: string, payload: Partial<TRoom>) => {
  const { amenities, ...restUpdatedRoom } = payload;

  // find a room by _id & dynamically update it
  const result = await Room.findByIdAndUpdate(
    id,
    {
      $addToSet: { amenities: { $each: amenities || [] } },
      ...restUpdatedRoom,
    },
    { new: true },
  );

  // check whether room is exists or not for update
  if (!result) {
    throw new AppError(404, '_id', 'Room is not found for update');
  }

  return result;
};

const deleteRoom = async (id: string) => {
  // find a room by _id & deleted it softly
  const result = await Room.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true },
  );

  // check whether room is exists or not for delete
  if (!result) {
    throw new AppError(404, '_id', 'Room is not found for delete');
  }

  return result;
};

export const RoomServices = {
  createRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
