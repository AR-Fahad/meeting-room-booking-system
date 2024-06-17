import { z } from 'zod';

export const userValidation = z.object({
  name: z
    .string()
    .regex(
      /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
      'Name can only contain letters and spaces',
    ),
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[@$!%*?&]/, 'Password must contain at least one special character'),
  phone: z
    .string()
    .min(10)
    .max(15)
    .regex(/^\d+$/, 'Phone number must only contain digits'),
  address: z.string(),
  role: z.enum(['admin', 'user']),
});
