/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unreachable */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import globalErrorHandler from '../app/middlewire/globalErrorhandler';
import routes from '../app/routes';
import router from '../app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();
app.use(cors());
app.use(cookieParser());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application route
app.use('/api/v1', router);

// app.get('/', (req: Request, res: Response,next) => {
// //  throw new ApiError(400,'hello world')
//  next('hello')
// })
// global error handler
// eslint-disable-next-line no-undef
app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    sucess: 'False',
    message: 'Not Found !',
    erroMessages: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  });
});
export default app;
