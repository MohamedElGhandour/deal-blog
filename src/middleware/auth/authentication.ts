import { Request, RequestHandler } from "express";
import { Role } from "../../types/enum";
import { verifyToken } from "../../utility/jsonwebtoken";
const User = require("../../models/User/user.model");

const auth: RequestHandler = async (request: Request | any, response, next) => {
  try {
    const token = (request.header("Authorization") as string).split(" ");
    if (token[0] !== "Bearer") throw new Error();
    const decoded = verifyToken(token[1]) as any;
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token[1],
    });
    if (!user) throw new Error();
    request.token = token[1];
    request.user = user;
    request.isAdmin = user.role === Role.ADMIN;
    next();
  } catch (error) {
    response.status(401).send({ error: "Please Authenticate!" });
  }
};

export = auth;
