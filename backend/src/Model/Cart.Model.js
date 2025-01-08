import mongoose from "mongoose";

const addToCartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qty: { type: Number, default: 1 },
    },
  ],
});

const CartModel = mongoose.model("Cart", addToCartSchema);

export default CartModel;
