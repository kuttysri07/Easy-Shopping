import axios from "axios";
import mongoose from "mongoose";
import productModel from "../Model/product.Model.js";

async function seedProducts() {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const products = response.data;

    await productModel.create(products);

    console.log("Products seeded successfully");
  } catch (error) {
    console.error("Error seeding products:", error.message);
  }
}

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://curljhonson07:Kuttysri07@todoapp.mrxzsi4.mongodb.net/Shopping",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Seed products
seedProducts();
