import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { userService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await userService.createUser(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});
const getUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUser();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await userService.updateUser(id, updatedData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!',
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userService.deleteUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  });
});

export const userController = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
