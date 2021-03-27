import mongoose from 'mongoose';

const MONGO_URL = `mongodb://root:password@receipt_mongo:27017/receipt`;

export const connectDB = async () => {
  try {
    console.log(`[MongoDB] Connection to ${MONGO_URL}`);
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log(`[MongoDB] Error in MongoDB connection: ${e}`);
  }
};

export default mongoose;
