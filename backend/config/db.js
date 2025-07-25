const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Exit on failure
    }
};

module.exports = connectDB;
