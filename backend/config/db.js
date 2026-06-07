import mongoose, { connect } from "mongoose";

const connectDB = async()=>{

    try {

        await mongoose.connect(process.env.MONGODB_URL);
        console.log("db connect successfully");

    } catch (error) {
        console.log("this is db error",error);

    }

}


export default connectDB
