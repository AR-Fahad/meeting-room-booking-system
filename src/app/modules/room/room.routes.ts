import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { createRoomValidation, updateRoomValidation } from './room.validation';
import { RoomControllers } from './room.controller';
import { auth } from '../../middlewares/auth';

export const roomRouter = Router();

roomRouter.post(
  '/',
  auth('admin'),
  validateRequest(createRoomValidation),
  RoomControllers.createRoom,
);

roomRouter.put(
  '/:id',
  auth('admin'),
  validateRequest(updateRoomValidation),
  RoomControllers.updateRoom,
);

roomRouter.get('/', RoomControllers.getAllRooms);

roomRouter.get('/:id', RoomControllers.getRoom);

roomRouter.delete('/:id', auth('admin'), RoomControllers.deleteRoom);
