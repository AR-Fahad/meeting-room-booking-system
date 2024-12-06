import { QueryBuilder } from '../../builders/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { TRoom } from './room.interface';
import { Room } from './room.model';

const createRoom = async (payload: TRoom) => {
  // post a room
  const result = await Room.create(payload);
  return result;
};

const getAllRooms = async (query: Record<string, unknown>) => {
  const roomQuery = new QueryBuilder(Room.find({ isDeleted: false }), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .priceRange()
    .capacityRange()
    .fields();

  // get all rooms by query
  const result = await roomQuery.modelQuery;
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
    throw new AppError(404, 'isDeleted', 'This room is already deleted');
  }

  return result;
};

const updateRoom = async (id: string, payload: Partial<TRoom>) => {
  // const { amenities, ...restUpdatedRoom } = payload;

  // find a room by _id & dynamically update it
  const result = await Room.findByIdAndUpdate(
    id,
    // {
    //  $addToSet: { amenities: { $each: amenities || [] } }, (It will be use if you want to push value by update)
    //   ...restUpdatedRoom
    // },
    payload,
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
