import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { roomRouter } from '../modules/room/room.routes';
import { slotRouter } from '../modules/slot/slot.routes';
import { bookingRouter } from '../modules/booking/booking.routes';
import { myBookingsRouter } from '../modules/myBookings/myBookings.routes';

export const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/rooms',
    router: roomRouter,
  },
  {
    path: '/slots',
    router: slotRouter,
  },
  {
    path: '/bookings',
    router: bookingRouter,
  },
  {
    path: '/my-bookings',
    router: myBookingsRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));
