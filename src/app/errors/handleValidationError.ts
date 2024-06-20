import { Error } from 'mongoose';

export const handleValidationError = (error: Error.ValidationError) => {
  const statusCode = 400;
  const message = 'Validation Error';
  const errorMessages = Object.values(error?.errors).map((value) => {
    return {
      path: value?.path,
      message: value?.message,
    };
  });
  return {
    statusCode,
    message,
    errorMessages,
  };
};
