import { z } from 'zod';

export const createBookingValidation = z.object({
  room: z.string(),
  slots: z.string().array(),
  user: z.string(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Invalid date format. Must be YYYY-MM-DD',
    })
    .refine(
      (str) => {
        const parts = str.split('-');
        const month = parseInt(parts[1], 10);
        return month >= 1 && month <= 12;
      },
      {
        message: 'Invalid month. Must be between 1 and 12',
      },
    )
    .refine(
      (str) => {
        const parts = str.split('-');
        const day = parseInt(parts[2], 10);
        return day >= 1 && day <= 31;
      },
      {
        message: 'Invalid day. Must be between 1 and 31',
      },
    ),
  isConfirmed: z.enum(['confirmed', 'unconfirmed', 'canceled']).optional(),
});

export const updateBookingValidation = z.object({
  isConfirmed: z.enum(['confirmed', 'unconfirmed', 'canceled']).optional(),
});
