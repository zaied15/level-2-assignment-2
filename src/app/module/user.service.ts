import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error("User already exist");
  }
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

const getSingleUserFromDB = async (userId: number) => {
  if ((await User.isUserExists(userId)) === null) {
    throw new Error("User not found in Database");
  }
  const result = await User.aggregate([
    { $match: { userId } },
    {
      $project: {
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

const updateUserIntoDB = async (id: number, userData: TUser) => {
  if (id !== userData.userId && (await User.isUserExists(id)) === null) {
    throw new Error("User not found to update!");
  }
  const result = User.updateOne(
    { userId: id },
    {
      userId: userData.userId,
      username: userData.username,
      password: userData.password,
      fullName: userData.fullName,
      age: userData.age,
      email: userData.email,
      isActive: userData.isActive,
      hobbies: userData.hobbies,
      address: userData.address,
      orders: userData.orders,
    },
  );
  return result;
};

const deleteUserFromDB = async (userId: number) => {
  if ((await User.isUserExists(userId)) === null) {
    throw new Error("User not found to delete!");
  }
  const result = await User.deleteOne({ userId: userId });
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
