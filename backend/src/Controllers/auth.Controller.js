import userModel from "../Model/auth.Model.js";
import bcrypt from "bcrypt";
import generateToken from "../utlis/jwt.js";

export const signup = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      name,
      password: hashedPassword,
      email,
    });

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({ message: `Sign Up Error ${error.message}` });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await userModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match, send an error response
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    generateToken(user._id, res);

    // Login successful
    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ message: `Login Error: ${error.message}` });
  }
};

export const logout = (req, res) => {
  try {
    // Clear the cookie by setting it to an empty value with a very short lifespan
    res.cookie("jwt", "", {
      httpOnly: true, // Ensure cookie can't be accessed by client-side scripts
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 0, // Expire immediately
    });

    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.error(`Logout controller Error: ${error.message}`, { error });

    res.status(500).json({ message: "Internal Server Error" });
  }
};
