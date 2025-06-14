const mongoose = require('mongoose');

// Robust MongoDB connection with fallback and clear logging
const connectDB = async () => {
    try {
        // Use MONGODB_URI from environment or fallback to local
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-tracker');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;