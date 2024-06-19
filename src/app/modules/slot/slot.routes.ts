import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { createSlotValidation } from './slot.validation';
import { SlotControllers } from './slot.controller';
import { auth } from '../../middlewares/auth';

export const slotRouter = Router();

slotRouter.post(
  '/',
  auth('admin'),
  validateRequest(createSlotValidation),
  SlotControllers.createSlots,
);

slotRouter.get('/availability', SlotControllers.getSlots);
