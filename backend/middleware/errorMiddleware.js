const AppError = require('../utils/AppError');

const handleCastErrorDB = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue || {})[0];
  const value = err.keyValue?.[field];
  const message = field
    ? `Duplicate value for ${field}: ${value}. Please use another value.`
    : 'Duplicate field value. Please use another value.';
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new AppError(`Invalid input data. ${errors.join('. ')}`, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }

  console.error('ERROR', err);
  return res.status(500).json({
    success: false,
    status: 'error',
    message: 'Something went wrong',
  });
};

const normalizeError = (err) => {
  if (err.name === 'CastError') return handleCastErrorDB(err);
  if (err.code === 11000) return handleDuplicateFieldsDB(err);
  if (err.name === 'ValidationError') return handleValidationErrorDB(err);
  return err;
};

const errorHandler = (err, req, res, next) => {
  let error = normalizeError(err);
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(error, res);
  }

  sendErrorProd(error, res);
};

module.exports = errorHandler;
