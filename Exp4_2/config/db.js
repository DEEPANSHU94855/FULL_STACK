import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Deepanshu1406:TAru1234@cluster0.7l8ztbw.mongodb.net/?appName=Cluster0");
        console.log("✅Connected to MongoDB");
    } catch (error) {
        console.error("❌MongoDB connection failed:", error.message);
        process.exit(1);
    }
};