import { catchAsync } from '../../utils/catchAsync';
import { noDataFound } from '../../utils/noDataFound';
import { sendResponse } from '../../utils/sendResponse';
import { MyBookingsServices } from './myBooking.service';
import { Request, Response } from 'express';

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await MyBookingsServices.getMyBookings(user);

  if (result.length === 0) {
    noDataFound(res);
  } else {
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'User bookings retrieved successfully',
      data: result,
    });
  }
});

export const MyBookingsControllers = {
  getMyBookings,
};
