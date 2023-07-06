import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { CowService } from './cow.service';
import pick from '../../../shared/pick';
import { cowFilterableFields } from './cow.constant';
import { paginationFields } from '../../../constant/pagination';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...CowData } = req.body;
  const result = await CowService.createCow(CowData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully!',
    data: result,
  });
});
const getCow = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await CowService.getCow(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved successfully!',
    data: result,
  });
});
const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.getSingleCow(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved successfully!',
    data: result,
  });
});
const updateCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await CowService.updateCow(id, updatedData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow updated successfully!',
    data: result,
  });
});
const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.deleteCow(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully!',
    data: result,
  });
});

export const CowController = {
  createCow,
  getCow,
  getSingleCow,
  updateCow,
  deleteCow,
};
