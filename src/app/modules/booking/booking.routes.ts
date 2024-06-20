import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createBookingValidation,
  updateBookingValidation,
} from './booking.validation';
import { BookingControllers } from './booking.controller';
import { auth } from '../../middlewares/auth';

export const bookingRouter = Router();

bookingRouter.post(
  '/',
  auth('user'),
  validateRequest(createBookingValidation),
  BookingControllers.createBooking,
);

bookingRouter.put(
  '/:id',
  auth('admin'),
  validateRequest(updateBookingValidation),
  BookingControllers.updateBooking,
);

bookingRouter.get('/', auth('admin'), BookingControllers.getAllBookings);

bookingRouter.delete('/:id', auth('admin'), BookingControllers.deleteBooking);
