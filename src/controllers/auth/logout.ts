import { RequestHandler } from "express";

export const logOut: RequestHandler = async (
  request: Request | any,
  response,
  next
) => {
  try {
    request.user.tokens = request.user.tokens.filter(
      (token: any) => token.token !== request.token
    );
    await request.user.save();
    response.send();
  } catch (error) {
    // response.status(400).json(error);
    next(error);
  }
};
