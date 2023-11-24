import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.aggregate([
    {
      $project: {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);

  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
};
