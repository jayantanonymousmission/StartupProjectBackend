// 📦 Import libraries and functions
import mongoose from 'mongoose';
import variable from '../storage/env/envConstants.js'; // Make sure this exports your MongoDB URI
import logger from '../logger/logger.js';

// 🔌 Database connectivity function
const databaseConnectivity = async () => {
    if (!variable.url) {
      logger.error("❗ MongoDB variable.url is undefined. Check your envConstants or .env file.");
      return;
    }
    try {
    await mongoose.connect(variable.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    logger.info("✅ Database successfully connected with your application");

    // 🔍 Optional: Listen to mongoose connection events
    mongoose.connection.on('connected', () => {
      logger.info("🔗 Mongoose connected to DB");
    });

    mongoose.connection.on('logger.error', (error) => {
      logger.error(`⚠️ Mongoose connection Failed: ${error.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.info("🔌 Mongoose disconnected from DB");
    });

    // 🧹 Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info("🛑 Mongoose connection closed due to app termination");
      process.exit(0);
    });

  } catch (error) {
    logger.er
    logger.error("❌ Failed to connect to the database");
    logger.error(`🛠️ logger.error details: ${error.message}`);
  }
};

//🌍 Export the function for global use
export default databaseConnectivity;