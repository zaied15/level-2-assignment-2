import { z } from 'zod';

const fullNameZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const addressZodSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

export const orderZodSchema = z.object({
  productName: z.string(),
  price: z.number().positive(),
  quantity: z.number().positive(),
});

export const userValidationSchema = z.object({
  userId: z.number().int().positive(),
  username: z.string(),
  password: z.string(),
  fullName: fullNameZodSchema,
  age: z.number().int().positive(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressZodSchema,
  orders: z.array(orderZodSchema).optional(),
});

export default userValidationSchema;
