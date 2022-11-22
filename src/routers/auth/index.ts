//  Packages
import { Router } from "express";

//  Controllers Methods
import {
  logIn,
  logOut,
  logOutAll,
  register,
} from "../../controllers/auth/index";

//  Middlewares
import authMiddleware from "../../middleware/auth/authentication";

const router = Router();

// Log-in
router.post("/login", logIn); // * Listed in Doc

// Log-out
router.post("/logout", authMiddleware, logOut); // * Not Listed in Doc

// Log-out All
router.post("/logoutall", authMiddleware, logOutAll); // * Not Listed in Doc

// Register
router.post("/register", register); // * Not Listed in Doc

export default router;
