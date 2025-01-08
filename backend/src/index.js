import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDatabase from "./utlis/db.js";
import authRouter from "./Routes/auth.Routes.js";
import cors from "cors";
import productRouter from "./Routes/Product.Router.js";
import cookieParser from "cookie-parser";

dotenv.config();

// Determine the CORS origin based on the environment
const allowedOrigins = process.env.NODE_ENV === "development"
  ? ["http://localhost:5000"] // Local development URL
  : ["https://easyshopping-qtwf.onrender.com/"]; // Production URL

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies
  })
);

app.use(express.json());
app.use(cookieParser());

connectDatabase();

app.use("/auth", authRouter);
app.use("/api", productRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is Running on Port", process.env.PORT);
});
