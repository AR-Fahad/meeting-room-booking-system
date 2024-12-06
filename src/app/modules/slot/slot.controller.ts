import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { SlotServices } from './slot.service';
import { sendResponse } from '../../utils/sendResponse';

const createSlots = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotServices.createSlots(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Slots created successfully',
    data: result,
  });
});

const getSlots = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotServices.getSlots(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Available slots retrieved successfully',
    data: result,
  });
});

const getAllSlots = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotServices.getAllSlots(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Slots retrieved successfully',
    data: result,
  });
});

const updateSlot = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SlotServices.updateSlot(id, req?.body);

  // if data found and no error when soft deleting
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Slot updated successfully',
    data: result,
  });
});

const deleteSlot = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SlotServices.deleteSlot(id);

  // if data found and no error when soft deleting
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Slot deleted successfully',
    data: result,
  });
});

export const SlotControllers = {
  createSlots,
  getSlots,
  getAllSlots,
  updateSlot,
  deleteSlot,
};
