import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { roomRouter } from '../modules/room/room.routes';
import { slotRouter } from '../modules/slot/slot.routes';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));
