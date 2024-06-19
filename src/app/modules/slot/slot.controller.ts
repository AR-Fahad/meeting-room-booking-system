import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { SlotServices } from './slot.service';
import { sendResponse } from '../../utils/sendResponse';
import { noDataFound } from '../../utils/noDataFound';

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

  if (result && result.length === 0) {
    noDataFound(res);
  } else {
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Available slots retrieved successfully',
      data: result,
    });
  }
});

export const SlotControllers = {
  createSlots,
  getSlots,
};
