const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log("MongoDB Connected");
    }
    catch(Error){
        console.log("error connecting to MongoDB ",Error);
        process.exit(1);
    }
};
module.exports = connectDB;