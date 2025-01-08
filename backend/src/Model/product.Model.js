import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: { count: Number, rate: Number },
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;
