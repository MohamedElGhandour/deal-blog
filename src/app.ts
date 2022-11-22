/**
 **
 **   Unfortunately, I did not have enough time for reasons beyond my control, that I could not complete the API Documentaion
 **
 */

//  Devlopment ENV
import path from "path";
require("dotenv").config({
  path: path.resolve(__dirname, "../config/dev.env"),
});

//  DB
import "./db/mongoose";

/*
 *
 *    This part should only be executed once.
 *    It is better to turn it (Remodeling module) into a comment after executing it
 *
 */

//  Remodeling
import "./remodeling/index";

//  Packages
import express from "express";
import cors from "cors";

//  Routers
import authRouter from "./routers/auth/index";
import postRouter from "./routers/post/index";
import adminRouter from "./routers/admin/index";

//  Middleware
import { errorHandler } from "./middleware/error/error";

//  App
const app = express();

//  Middleware
app.use(cors());
app.use(express.json());

//  Routes
app.use("/user", authRouter);
app.use("/posts", postRouter);
app.use("/admin", adminRouter);

//  Error Middleware
app.use(errorHandler);

//  Not Found - 404
app.get("*", (_req, res) => {
  res.status(404).json({ err: "Not Found" });
});

export = app;
