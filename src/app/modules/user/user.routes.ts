import express from 'express';
import { userController } from './user.controller';
import auth from '../../middlewire/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';
import {  profileController,  } from '../profile/profile.controller';
const router = express.Router();


router.patch('/:id',auth(ENUM_USER_ROLE.ADMIN),userController.updateUser);
router.post('/:id', auth(ENUM_USER_ROLE.ADMIN),userController.deleteUser);
router.get('/', auth(ENUM_USER_ROLE.ADMIN),userController.getUser);
router.get('/my-profile', auth(ENUM_USER_ROLE.BUYER,ENUM_USER_ROLE.SELLER),profileController.getProfile);


export const UserRoutes = router;
