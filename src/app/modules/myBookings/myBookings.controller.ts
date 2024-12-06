import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { MyBookingsServices } from './myBooking.service';
import { Request, Response } from 'express';

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user;
  const result = await MyBookingsServices.getMyBookings(user);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User bookings retrieved successfully',
    data: result,
  });
});

export const MyBookingsControllers = {
  getMyBookings,
};
