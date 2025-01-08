import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://curljhonson07:Kuttysri07@todoapp.mrxzsi4.mongodb.net/Shopping');
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(`MongoDB Connection Error ${error}`);
  }
};

export default connectDatabase;
