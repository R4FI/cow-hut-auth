/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { AdminModel, IAdmin } from "./admin.interface";
import config from "../../../config";
import bcrypt from 'bcrypt'
const adminSchema = new Schema<IAdmin>({
    role: {
      type: String,
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
      type: String,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  
  });
  adminSchema.pre('save', async function (next) {
    try {
      // Hashing user password
      const admin = this;
      const saltRounds = Number(config.bcrypt_salt_round);
      const hashedPassword = await bcrypt.hash(admin.password, saltRounds);
      admin.password = hashedPassword;
      next();
    } catch (error) {
      next();
    }
  });

  export const admin = model<IAdmin, AdminModel>('Admin',adminSchema);