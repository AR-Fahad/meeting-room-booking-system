import { z } from 'zod';

export const createRoomValidation = z.object({
  name: z
    .string()
    .regex(
      /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
      'Name can only contain letters and spaces',
    ),
  roomNo: z.number(),
  floorNo: z.number(),
  capacity: z.number(),
  pricePerSlot: z.number(),
  amenities: z.string().array(),
});

export const updateRoomValidation = z.object({
  name: z
    .string()
    .regex(
      /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
      'Name can only contain letters and spaces',
    )
    .optional(),
  roomNo: z.number().optional(),
  floorNo: z.number().optional(),
  capacity: z.number().optional(),
  pricePerSlot: z.number().optional(),
  amenities: z.string().array().optional(),
});
