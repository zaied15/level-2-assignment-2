import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema, { orderZodSchema } from './user.validator';
import { ZodError } from 'zod';

// Create User controller
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodValidateUserData = userValidationSchema.parse(user);
    const result = await userServices.createUserIntoDB(zodValidateUserData);
    const {
      userId,
      username,
      fullName,
      age,
      email,
      isActive,
      hobbies,
      address,
    } = result;

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: {
        userId,
        username,
        fullName,
        age,
        email,
        isActive,
        hobbies,
        address,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(500).json({
        success: false,
        message: 'User data format is not valid!',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
    });
  }
};

// Get All User Controller
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === 'CastError') {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};

// Get Single User Controller
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result[0],
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === 'CastError') {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};

// Update User controller
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId: id } = req.params;
    const idNumber = Number(id);
    const user = req.body;
    const zodValidateUserData = userValidationSchema.parse(user);
    const result = await userServices.updateUserIntoDB(
      idNumber,
      zodValidateUserData,
    );

    if (result.acknowledged === true) {
      const {
        userId,
        username,
        fullName,
        age,
        email,
        isActive,
        hobbies,
        address,
      } = zodValidateUserData;

      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: {
          userId,
          username,
          fullName,
          age,
          email,
          isActive,
          hobbies,
          address,
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(500).json({
        success: false,
        message: 'User data format is not valid to update!',
        errorType: error.issues[0].message,
        data: null,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};

// Delete user controller
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteUserFromDB(Number(userId));
    if (result.acknowledged === true) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === 'CastError') {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};

// Add Order Controller
const addOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = req.body;
    const validateOrder = orderZodSchema.parse(order);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const result = await userServices.addOrderIntoDB(
      Number(userId),
      validateOrder,
    );

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(500).json({
        success: false,
        message: 'Order data format is not valid!',
      });
    }
    if (error.name === 'CastError') {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};

// Get All Oder Controller
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getOrderFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        orders: result[0].orders,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === 'CastError') {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};

// Get Total Price Controller
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getTotalPriceFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result[0] || 0,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === 'CastError') {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteUser,
  addOrder,
  getAllOrder,
  getTotalPrice,
};
