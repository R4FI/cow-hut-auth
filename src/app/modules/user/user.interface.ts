import { Model } from 'mongoose';

export type ISeller = {
  seller: string;
};
export type IBuyer = {
  buyer: string;
};

export type IUser = {
  role: string;
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: number;
  address: string;
  password: string;
  budget: number;
  income: number;
};
export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role' >>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>>;
