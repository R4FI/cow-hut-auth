import { Model, Types } from 'mongoose';
import { ISeller } from '../user/user.interface';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: string;
  breed: string;
  weight: number;
  label: string;
  category: string;
  seller: Types.ObjectId | ISeller;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
  minPrice?:number;
  maxPrice?:number;
  location?: string;
};
