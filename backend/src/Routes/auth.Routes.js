import { Router } from "express";
import { login, logout, signup } from "../Controllers/auth.Controller.js";
import { protectRoute } from "../Middelwars/middelware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/status", protectRoute, (req, res) => {
  res.json({ loggedIn: true, user: req.user });
});

export default router;
