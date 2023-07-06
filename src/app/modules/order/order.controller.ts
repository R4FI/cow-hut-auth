import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.service";
import { Request, Response } from "express";


const createOrder = catchAsync(async (req: Request, res: Response) => {
    const { ...orderData } = req.body;
    const result = await OrderService.createOrder(orderData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  });
const getOrder = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderService.getOrder();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrieved successfully!',
      data: result,
    });
  });
const singleOrder = catchAsync(async (req: Request, res: Response) => {
  const id =req.params.id  
  const result = await OrderService.getSingleOrder(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrieved successfully!',
      data: result,
    });
  });

  export const OrderController = {
    createOrder,
    singleOrder,
    getOrder
  }