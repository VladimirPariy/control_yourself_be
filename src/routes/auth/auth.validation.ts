import {z} from 'zod';

const passwordSchema = z.coerce
  .string()
  .min(8, {message: 'Password must be at least 8 characters long'})
  .max(32, {message: 'Password must be at most 32 characters long'})
  .trim()
  .refine((pass) => /[A-Z]/.test(pass), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine((pass) => /[a-z]/.test(pass), {
    message: 'Password must contain at least one lowercase letter',
  })
  .refine((pass) => /[0-9]/.test(pass), {
    message: 'Password must contain at least one number',
  })
  .refine((pass) => /[^A-Za-z0-9]/.test(pass), {
    message: 'Password must contain at least one special character',
  });

export const signupSchema = z
  .object({
    confirmPassword: passwordSchema,
    email: z.coerce.string().email(),
    password: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password and confirm password do not match',
    path: ['confirmPassword'],
  });

export type SignupData = z.infer<typeof signupSchema>;
