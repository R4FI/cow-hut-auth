/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { locations } from './user.constant';


const userSchema = new Schema<IUser,Record<string,never>>({
  role: {
    type: String,
    enum: ['buyer', 'seller'],
    required: true,
  },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  password: {
    type: String,
    required: true,
    select: 0,
  },
  phoneNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    enum: locations,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
});

userSchema.statics.isUserExist = async function (
 phoneNumber:string | number
): Promise<Pick<
  IUser,
  'phoneNumber' | 'password' | 'role' 
> | null> {
  return await User.findOne(
    {phoneNumber},
    { phoneNumber: 1, password: 1, role: 1,  }
  );
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// user.create()/user.save()---before saving we encrypt passwords
userSchema.pre('save', async function (next) {
  try {
    // Hashing user password
    const user = this;
    const saltRounds = Number(config.bcrypt_salt_round);
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next();
  }
});

export const User = model<IUser, UserModel>('User', userSchema);
