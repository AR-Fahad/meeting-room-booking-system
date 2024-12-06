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

const getAllRooms = catchAsync(async (req: Request, res: Response) => {
  const query = req?.query;
  const result = await RoomServices.getAllRooms(query);

  // if no data found
  // if (result && result.length === 0) {
  //   noDataFound(res);
  // }
  // if data found

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Rooms retrieved successfully',
    data: result,
  });
});

const getRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await RoomServices.getRoom(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Room retrieved successfully',
    data: result,
  });
});

const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoomServices.updateRoom(id, req.body);

  // if data found and no error when updating data
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Room updated successfully',
    data: result,
  });
});

const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoomServices.deleteRoom(id);

  // if data found and no error when soft deleting
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Room deleted successfully',
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
