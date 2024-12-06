import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { noRoutesFound } from './app/middlewares/noRoutesFound';
import { globalErrorHandle } from './app/middlewares/globalErrorHandle';
import { router } from './app/routes/routes';

const app: Application = express();

// parser
app.use(express.json());
app.use(
  cors({
    origin: 'https://meeting-room-booking-system-client-one.vercel.app',
    credentials: true,
  }),
);

// routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'MEETING ROOM BOOKING SYSTEM server is running successfully!',
  });
});

app.use(globalErrorHandle);

app.use(noRoutesFound);

export default app;
