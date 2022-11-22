//  Packages
import { Router } from "express";

//  Controllers Methods
import { createPost, posts, post } from "../../controllers/post/index";

//  Middlewares
import authMiddleware from "../../middleware/auth/authentication";

const router = Router();

// Create Post
router.post("/", authMiddleware, createPost); // * Listed in Doc

// Get Posts
router.get("/", authMiddleware, posts); // * Listed in Doc

// Get Post
router.get("/:id", authMiddleware, post); // * Not Listed in Doc

export default router;
