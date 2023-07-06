import { Model } from "mongoose";


export type IAdmin ={
    role: string;
    name:{
        firstName:string,
        lastName:string
    };
    password:string;
    phoneNumber: string;  
    address:string; 
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>;