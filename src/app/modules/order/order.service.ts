import { Types } from "mongoose";
import { User } from "../user/user.model";
import { Order } from "./order.model"
import { Cow } from "../cows/cow.model";
import { startSession } from 'mongoose';
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
// import { ICow } from "../cows/cow.interface";
// import { IBuyer, } from "../user/user.interface";

const createOrder = async (order: { cow: Types.ObjectId; buyer: Types.ObjectId }) => {
    const session = await startSession();
    session.startTransaction();
  
    try {
      const buyer = await User.findOne({ _id: order.buyer, role: 'buyer' }).session(session);
      if (!buyer) {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE,'Invalid buyer!');
      }
  
      const cow = await Cow.findOne({ _id: order.cow }).session(session);
      if (!cow) {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE,'Invalid cow!');
      }
  
      const seller = await User.findOne({ _id: cow.seller }).session(session);
      if (!seller) {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE,'Invalid seller!');
      }
  
      const cowPrice = cow.price;
  
      if (buyer.budget < cowPrice) {
        throw new Error('Insufficient funds!');
      }
  
      buyer.budget -= cowPrice;
      seller.income += cowPrice;
      cow.label = 'sold out';
  
      await buyer.save();
      await seller.save();
      await cow.save();
  
      const result = await Order.create(order);
  
      await session.commitTransaction();
      session.endSession();
  
      return result;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };


const getOrder =async () => {
    const result = await Order.find({})
    return result;

}
const getSingleOrder =async (orderId:string) => {
    const order = await Order.findById(orderId)
    .populate({
      path:'cow',
      populate:{
        path:'seller',
      }
    })
    .populate('buyer')   
    if(!order){
      throw new ApiError(httpStatus.NOT_FOUND,"Order not found")
    }
        // const cow = order?.cow as ICow;
    // const buyer = order?.buyer as IBuyer;

  return order
}

export const OrderService = {
    createOrder,
    getSingleOrder,
    getOrder
}
