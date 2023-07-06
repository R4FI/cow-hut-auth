import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { profileService } from "./profile.service";


const  getProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization; // Retrieve the access token from the request headers
    if (!token) {
      throw new Error('Access token is missing');
    }

  const result = await profileService.getProfile(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrieved successfully!',
    data: result,
  });
});



export  const profileController ={
  getProfile
}