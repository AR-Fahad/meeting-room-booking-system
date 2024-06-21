import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { BookingServices } from './booking.service';
import { sendResponse } from '../../utils/sendResponse';
import { noDataFound } from '../../utils/noDataFound';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.createBooking(req?.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getAllBookings();

  if (result && result?.length === 0) {
    noDataFound(res);
  } else {
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'All bookings retrieved successfully',
      data: result,
    });
  }
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingServices.updateBooking(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBooking(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
