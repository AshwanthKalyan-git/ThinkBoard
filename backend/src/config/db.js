import mongoose from 'mongoose';

export const connectionDB = async() => {
   
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        
    } catch (error) {

        console.error("Was not able to connect to MongoDB",error);
        
    }
}