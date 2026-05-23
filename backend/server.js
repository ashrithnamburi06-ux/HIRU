require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  let server;

  try {
    await connectDB();
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.warn(
      'Starting server without database. Connect MongoDB and restart to enable product APIs.'
    );
  }

  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(
      `HIRU Elegance API (${process.env.NODE_ENV || 'development'}) — http://localhost:${PORT}`
    );
  });

  const shutdown = (signal) => {
    console.log(`${signal} received. Shutting down gracefully...`);
    server.close(() => {
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err.message);
    if (server) {
      server.close(() => process.exit(1));
    } else {
      process.exit(1);
    }
  });
};

startServer();
