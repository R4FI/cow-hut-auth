import { ENUM_USER_ROLE } from "../../../enums/users";

export type ILoginUser = {
    phoneNumber: string | number;
    password: string;
  };

  export type ILoginUserResponse = {
    accessToken: string;
    refreshToken?: string;
  };
  
  export type IRefreshTokenResponse = {
    accessToken: string;
  };
  
  export type IVerifiedLoginUser = {
    userId: string;
    role: ENUM_USER_ROLE;
  };