import { z } from 'zod';

export const createSlotValidation = z.object({
  room: z.string(),
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
  startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, {
    message: 'Invalid time format. Must be HH:MM',
  }),
  endTime: z.string().regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, {
    message: 'Invalid time format. Must be HH:MM',
  }),
});
