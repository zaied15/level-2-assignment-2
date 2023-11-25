import { Model, model, Schema } from "mongoose";
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from "./user.interface";

const fullNameSchema = new Schema<TFullName>({
  firstName: String,
  lastName: String,
});

const addressSchema = new Schema<TAddress>({
  street: String,
  city: String,
  country: String,
});

const orderSchema = new Schema<TOrder>({
  productName: String,
  price: Number,
  quantity: Number,
});

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: fullNameSchema, required: true },
  age: { type: Number },
  email: { type: String, required: true },
  isActive: { type: Boolean },
  hobbies: [String],
  address: addressSchema,
  orders: [orderSchema],
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>("User", userSchema);
