import CartModel from "../Model/Cart.Model.js";
import productModel from "../Model/product.Model.js"; // Ensure correct path and extension
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find(); // Use camelCase for variables
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error in getProducts controller: ${error.message}` }); // Use 500 for server error
  }
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  // Validate the id format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error in getSingleProduct controller:", error.message);
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
};

export const addToCart = async (req, res) => {
  const { productId, qty, userId } = req.body;

  // Input validation
  if (!productId || !userId || qty === undefined) {
    return res
      .status(400)
      .json({ message: "Product ID, quantity, and user ID are required." });
  }

  if (qty <= 0) {
    return res
      .status(400)
      .json({ message: "Quantity must be greater than 0." });
  }

  try {
    // Check if the user already has a cart
    let cart = await CartModel.findOne({ userId });

    if (cart) {
      // Check if the product already exists in the cart
      const productIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex > -1) {
        // Update the quantity of the existing product
        cart.items[productIndex].qty += qty;
      } else {
        // Add the new product to the cart
        cart.items.push({ productId: productId, qty });
      }

      // Save the updated cart
      await cart.save();

      return res.status(200).json({
        productId,
        userId,
        qty,
      });
    } else {
      // Create a new cart for the user
      cart = await CartModel.create({
        userId,
        items: [{ productId: productId, qty }],
      });
    }

    // Respond with the updated cart
    res.status(201).json(cart);
  } catch (error) {
    console.error("Error in addToCart controller:", error.message);

    // Handle potential database errors or other server issues
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
};

export const getCartItems = async (req, res) => {
  const { id } = req.params; // Extract the userId from req.params

  try {
    const fetchCartItem = await CartModel.findOne({ userId: id }).populate({
      path: "items.productId", // Path to populate based on schema
      model: "Product", // Reference the Product model
    });

    if (!fetchCartItem) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    console.log(fetchCartItem);
    return res.status(200).json(fetchCartItem);
  } catch (error) {
    console.error("Error in getCartItems controller:", error.message);
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
};

export const deleteCartItem = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Find the cart for the user and update it
    const updatedCart = await CartModel.findOneAndUpdate(
      { userId }, // Find the cart by userId
      { $pull: { items: { productId } } }, // Remove the item with the specified productId
      { new: true } // Return the updated document
    ).populate({
      path: "items.productId", // Path to populate based on schema
      model: "Product", // Reference the Product model
    });

    if (!updatedCart) {
      return res
        .status(404)
        .json({ message: `No cart found for user with ID: ${userId}` });
    }

    res.status(200).json({
      message: "Product removed from cart successfully",
      updatedCart,
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({
      message: "An error occurred while deleting the product from the cart",
    });
  }
};
