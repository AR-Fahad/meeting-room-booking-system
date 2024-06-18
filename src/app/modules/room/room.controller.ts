import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { RoomServices } from './room.service';
import { sendResponse } from '../../utils/sendResponse';

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.createRoom(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Room added successfully',
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
};
