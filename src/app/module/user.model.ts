import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './user.interface';
import config from '../config';

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

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.pre('updateOne', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = this.getUpdate();
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
