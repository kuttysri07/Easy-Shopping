import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDatabase from "./utlis/db.js";
import authRouter from "./Routes/auth.Routes.js";
import cors from "cors";
import productRouter from "./Routes/Product.Router.js";
import cookieParser from "cookie-parser";

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your React app's URL
    credentials: true, // Allow cookies
  })
);
app.use(express.json());
app.use(cookieParser());
dotenv.config();

connectDatabase();

app.use("/auth", authRouter);
app.use("/api", productRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is Running on Port", process.env.PORT);
});
