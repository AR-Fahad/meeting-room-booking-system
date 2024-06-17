import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { noRoutesFound } from './app/middlewares/noRoutesFound';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'MEETING ROOM BOOKING SYSTEM server is running successfully!',
  });
});

app.use(noRoutesFound);

export default app;
