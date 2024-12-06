import { Types } from 'mongoose';

export type TIsConfirmed = 'confirmed' | 'unconfirmed' | 'canceled';

export type TBooking = {
  room: Types.ObjectId;
  slots: [Types.ObjectId];
  user: Types.ObjectId;
  date: string;
  totalAmount?: number;
  isConfirmed?: TIsConfirmed;
  isDeleted?: boolean;
  isPaid?: boolean;
};
