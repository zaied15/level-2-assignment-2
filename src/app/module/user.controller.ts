import { Request, Response } from "express";
import { userServices } from "./user.service";
import userValidationSchema from "./user.validator";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
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
      message: "User created successfully!",
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      data: error,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      data: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      data: error,
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId: id } = req.params;
    const idNumber = Number(id);
    const { user } = req.body;
    const zodValidateUserData = userValidationSchema.parse(user);
    const result = await userServices.updateUserIntoDB(
      idNumber,
      zodValidateUserData,
    );

    if (result.acknowledged === true) {
      const resultAfterOutput = await userServices.getSingleUserFromDB(
        user.userId,
      );
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
        message: "User updated successfully!",
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      data: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      data: error,
    });
  }
};

export const userControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteUser,
};
