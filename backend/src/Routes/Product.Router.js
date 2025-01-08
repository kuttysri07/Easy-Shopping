import { Router } from "express";
import {
  addToCart,
  deleteCartItem,
  getCartItems,
  getProducts,
  getSingleProduct,
} from "../Controllers/Product.Controller.js";
import { protectRoute } from "../Middelwars/middelware.js";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:id", getSingleProduct);
router.post("/addtocart", protectRoute, addToCart);
router.get("/getcartitems/:id", protectRoute, getCartItems);
router.post("/deletecartitem", deleteCartItem);

export default router;
