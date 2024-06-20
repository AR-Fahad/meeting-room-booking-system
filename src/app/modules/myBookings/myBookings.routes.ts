import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { MyBookingsControllers } from './myBookings.controller';

export const myBookingsRouter = Router();

myBookingsRouter.get('/', auth('user'), MyBookingsControllers.getMyBookings);
