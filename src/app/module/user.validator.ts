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
  street: z.string({
    required_error: 'Street is required',
    invalid_type_error: 'Street must be a string',
  }),
  city: z.string({
    required_error: 'City is required',
    invalid_type_error: 'City name must be a string',
  }),
  country: z.string({
    required_error: 'Country is required',
    invalid_type_error: 'Country name must be a string',
  }),
});

export const orderZodSchema = z.object({
  productName: z.string({
    invalid_type_error: 'Product name must be a string',
  }),
  price: z
    .number({
      invalid_type_error: 'Price must be a number',
    })
    .positive(),
  quantity: z
    .number({
      invalid_type_error: 'Quantity must be a number',
    })
    .positive(),
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
  hobbies: z.array(
    z.string({
      invalid_type_error: 'Hobbies must be a string',
    }),
  ),
  address: addressZodSchema,
  orders: z.array(orderZodSchema).optional(),
});

export default userValidationSchema;
