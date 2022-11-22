import { RequestHandler, Request } from "express";

export const logOutAll: RequestHandler = async (
  request: Request | any,
  response,
  next
) => {
  try {
    request.user.tokens = [];
    await request.user.save();
    response.send();
  } catch (error) {
    // response.status(400).json(error);
    next(error);
  }
};
