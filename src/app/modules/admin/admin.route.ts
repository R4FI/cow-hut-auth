import express from 'express';
import { adminController } from './admin.controller';
const router = express.Router();

router.post('/create-admin', adminController.createAdmin);
// router.patch('/:id', userController.updateUser);
// router.post('/:id', userController.deleteUser);
// router.get('/', userController.getUser);

export const AdminRoutes = router;
