//  Packages
import { Router } from "express";

//  Controllers Methods
import { statistics } from "../../controllers/admin/index";

//  Middlewares
import authMiddleware from "../../middleware/auth/authentication";

const router = Router();

// Get Statistics
router.get("/statistics", authMiddleware, statistics); // * Listed in Doc

export default router;
