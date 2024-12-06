import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { createSlotValidation, updateSlotValidation } from './slot.validation';
import { SlotControllers } from './slot.controller';
import { auth } from '../../middlewares/auth';

export const slotRouter = Router();

slotRouter.post(
  '/',
  auth('admin'),
  validateRequest(createSlotValidation),
  SlotControllers.createSlots,
);

slotRouter.put(
  '/:id',
  auth('admin'),
  validateRequest(updateSlotValidation),
  SlotControllers.updateSlot,
);

slotRouter.delete('/:id', auth('admin'), SlotControllers.deleteSlot);

slotRouter.get('/', auth('admin'), SlotControllers.getAllSlots);

slotRouter.get('/availability', SlotControllers.getSlots);
