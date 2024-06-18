import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { createRoomValidation } from './room.validation';
import { RoomControllers } from './room.controller';
import { auth } from '../../middlewares/auth';

export const roomRouter = Router();

roomRouter.post(
  '/',
  auth('admin'),
  validateRequest(createRoomValidation),
  RoomControllers.createRoom,
);
