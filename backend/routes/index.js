const express = require('express');
const productRoutes = require('./productRoutes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'HIRU Elegance API is running',
    timestamp: new Date().toISOString(),
  });
});

router.use('/products', productRoutes);

module.exports = router;
