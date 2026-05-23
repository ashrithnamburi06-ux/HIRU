const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { configureCloudinary } = require('./config/cloudinary');
const apiRoutes = require('./routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorMiddleware');

configureCloudinary();

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to HIRU Elegance API',
    version: '1.0.0',
  });
});

app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
