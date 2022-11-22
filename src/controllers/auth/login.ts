//  Types
import { RequestHandler } from "express";

//  Models
import User from "../../models/User/user.model";

export const logIn: RequestHandler = async (request, response, next) => {
  const { email, password } = request.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    response.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};
