import { Secret } from 'jsonwebtoken';
import { User } from '../user/user.model';
import { jwtHelpers } from './../../../helper/jwt.helper';
import config from '../../../config';


// const getProfile = async () => {
//       const result = await User.find({})
//       return result
// }

const getProfile = async (token:string) => {
  
    // Verify the access token and extract the user's _id and role
    const decodedToken = jwtHelpers.verifyToken(token,config.jwt.secret as Secret);
    const { _id,} = decodedToken;

    // Retrieve user's profile information based on _id and role
    const userProfile = await User.findById(_id);

    return userProfile;

};
  // export async function updateProfile(userId: string, profileData: Partial<IUser>): Promise<IUser> {
  //   try {
  //     const user = await User.findById(userId);
  //     if (!user) {
  //       throw new ApiError(httpStatus.NOT_FOUND,'User not found');
  //     }
  
  //     if (profileData.password) {
  //       const hashedPassword = await bcrypt.hash(profileData.password, 12);
  //       profileData.password = hashedPassword;
  //     }
  
  //     Object.assign(user, profileData);
  //     await user.save();
  
  //     return user;
  //   } catch (error) {
  //     throw new Error('Failed to update user profile');
  //   }
  // }
export const profileService ={
  getProfile
}