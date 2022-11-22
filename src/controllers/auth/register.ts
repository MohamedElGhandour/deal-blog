import { RequestHandler } from "express";
import User from "../../models/User/user.model";

export const register: RequestHandler = async (request, response, next) => {
  const { username, email, password, role } = request.body;
  try {
    const user = new User({
      username,
      email,
      password,
      role,
    });
    await user.save();
    const token = await user.generateAuthToken();
    response.send({ user, token });
  } catch (error) {
    next(error);
  }
};
