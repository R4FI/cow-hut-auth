import { IAdmin } from "./admin.interface";
import { admin } from "./admin.model";




const createAdmin =async (payoad:IAdmin) => {
    const result = await admin.create(payoad)
    return result;

}



export const adminService = {
    createAdmin
}