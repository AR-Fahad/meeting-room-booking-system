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
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);

        if (month < 1 || month > 12) return false;

        const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in the month
        return day >= 1 && day <= daysInMonth;
      },
      {
        message: 'Invalid day for the given month and year',
      },
    )
    .refine(
      (str) => {
        const inputDate = new Date(str);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to start of the day
        return inputDate > today;
      },
      {
        message: 'Date must be greater than the current date',
      },
    ),
  isConfirmed: z.enum(['confirmed', 'unconfirmed', 'canceled']).optional(),
});

export const updateBookingValidation = z.object({
  isConfirmed: z.enum(['confirmed', 'unconfirmed', 'canceled']).optional(),
});
