import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { roomRouter } from '../modules/room/room.routes';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));
