import { IGenericErrorMessage } from '../intefaces/error';
import { MongoServerError } from 'mongodb';

const handleMongoServerError = (error: MongoServerError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'E11000 duplicate key error collection:',
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Mongo Server Error',
    errorMessages: errors,
  };
};

export default handleMongoServerError;
