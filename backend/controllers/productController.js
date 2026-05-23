const Product = require('../models/Product');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getProducts = catchAsync(async (req, res) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const [products, total] = await Promise.all([
    features.query,
    Product.countDocuments(features.filterCriteria),
  ]);

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    page: features.page,
    pages: Math.ceil(total / features.limit) || 1,
    data: products,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

exports.createProduct = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});
