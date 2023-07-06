import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { cowRoutes } from '../modules/cows/cow.route';
import { OrderRoutes } from '../modules/order/order.route';
import { authRoutes } from '../modules/auth/auth.route';
import { AdminRoutes } from '../modules/admin/admin.route';
const router = express.Router();

const moduleRoutes = [
      {
      path:'/auth',
      route:authRoutes
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cows',
    route: cowRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
