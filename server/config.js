import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const url = process.env.MONGO_DB_URL 
export const connectWithMongoose = async () => {
    try {
        await mongoose.connect(url);
        console.log("MongoDB is Connected")
    } catch (error) {
        console.log(error.message || error)
    }
}