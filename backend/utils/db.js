import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;



MONGO_URI=mongodb+srv://magajimujittapha5_db_user:ItdXYyYs1l7sr1mb@cluster0.v4xmzzw.mongodb.net/?appName=Cluster0

PORT=3000

SECRET_KEY=jsgekgwogdlgeuosgdogeyoxhdyk


CLOUD_NAME=dppzcdfxi 

API_KEY=463599621661158

API_SECRET=uk5rtZUsG98a4UqoWnKIQ0l-ZrY



 
 