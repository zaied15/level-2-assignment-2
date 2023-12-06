import { z } from 'zod';

const fullNameZodSchema = z.object({
  firstName: z.string({
    required_error: 'First name is required',
    invalid_type_error: 'First name must be a string',
  }),
  lastName: z.string({
    required_error: 'Last name is required',
    invalid_type_error: 'Last name must be a string',
  }),
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
  userId: z
    .number({
      required_error: 'Id is required',
      invalid_type_error: 'Id must be a number',
    })
    .int()
    .positive(),
  username: z.string({
    required_error: 'User name is required',
    invalid_type_error: 'Name must be a string',
  }),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
  fullName: fullNameZodSchema,
  age: z
    .number({ invalid_type_error: 'Age must be a number' })
    .int()
    .positive(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressZodSchema,
  orders: z.array(orderZodSchema).optional(),
});

export default userValidationSchema;
