//  Types
import { RequestHandler, Request } from "express";

//  Models
import Post from "../../models/Post/post.model";

// Enum
import { STATUS } from "../../types/enum";

export const createPost: RequestHandler = async (
  request: Request | any,
  response,
  next
) => {
  const { title, body } = request.body;
  try {
    const post = new Post({
      title,
      body,
      status: request.isAdmin ? STATUS.APPROVED : STATUS.PENDING,
      createdBy: request.user._id,
    });
    await post.save();
    response.status(200).json({ data: post });
  } catch (error) {
    next(error);
  }
};
