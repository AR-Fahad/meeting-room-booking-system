import { AppError } from '../../errors/AppError';
import { TRoom } from './room.interface';
import { Room } from './room.model';

const createRoom = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

const getAllRooms = async () => {
  const result = await Room.find();
  return result;
};

const getRoom = async (id: string) => {
  const result = await Room.findById(id);
  // check whether room is deleted or not
  if (result?.isDeleted) {
    throw new AppError(400, 'isDeleted', 'This room is already deleted');
  }
  return result;
};

const updateRoom = async (id: string, payload: Partial<TRoom>) => {
  const { amenities, ...restUpdatedRoom } = payload;

  const result = await Room.findByIdAndUpdate(
    id,
    {
      $addToSet: { amenities: { $each: amenities || [] } },
      ...restUpdatedRoom,
    },
    { new: true },
  );

  return result;
};

const deleteRoom = async (id: string) => {
  const result = await Room.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true },
  );

  return result;
};

export const RoomServices = {
  createRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
