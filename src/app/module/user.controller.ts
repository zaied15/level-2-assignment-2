import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const result = await userServices.createUserIntoDB(user);
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
  } catch (error) {
    res.status(200).json({
      success: true,
      message: "something went wrong",
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
  } catch (error) {
    res.status(200).json({
      success: true,
      message: "Something went wrong",
      data: error,
    });
  }
};

export const userControllers = {
  createUser,
  getAllUser,
};
