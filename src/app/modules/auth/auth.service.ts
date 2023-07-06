import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { jwtHelpers } from '../../../helper/jwt.helper';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  const isUserExist = await User.isUserExist(phoneNumber as string);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  //create access token & refresh token

  const { phoneNumber: userPhoneNumber, role,  } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userPhoneNumber, role },
    config.jwt.secret as Secret,
    config.jwt.token_expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userPhoneNumber, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { phoneNumber } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(phoneNumber);
  // if (!isUserExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  // }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      phoneNumber: isUserExist.phoneNumber,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.token_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};