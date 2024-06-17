import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';

export const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    router: authRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));
