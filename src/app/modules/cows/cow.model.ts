/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { ICow, CowModel } from './cow.interface';
import { breed, category } from './cow.constant';
import { locations } from '../user/user.constant';

const cowSchema = new Schema<ICow>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    enum: locations,
    required: true,
  },
  breed: {
    type: String,
    enum: breed,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    enum: ['for sale', 'sold out'],
    default: 'for sale',
    required: true,
  },
  category: {
    type: String,
    enum: category,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref:"User"
  },
});

export const Cow = model<ICow, CowModel>('Cow', cowSchema);
