import { Request,Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { adminService } from "./admin.service";
import httpStatus from "http-status";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const { ...adminData } = req.body;
    const result = await adminService.createAdmin(adminData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  });


  export const adminController = {
    createAdmin
  }