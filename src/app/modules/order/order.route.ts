import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewire/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post('/',auth(ENUM_USER_ROLE.BUYER),OrderController.createOrder);
router.get('/:id', OrderController.singleOrder);
// router.post('/:id', OrderController.deleteUser);
router.get('/', auth(ENUM_USER_ROLE.BUYER,ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SELLER),OrderController.getOrder);

export const OrderRoutes = router;
