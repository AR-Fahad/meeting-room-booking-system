import { TRoom } from './room.interface';
import { Room } from './room.model';

const createRoom = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

export const RoomServices = {
  createRoom,
};
