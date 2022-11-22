import { RequestHandler } from "express";
import Post from "../../models/Post/post.model";

export const post: RequestHandler = async (
  request: Request | any,
  response
) => {
  const _id = request.params.id;
  try {
    let post: any = await Post.findOne({ _id }).populate([
      {
        path: "createdBy",
        select: "-__v -password -tokens -createdAt -updatedAt",
      },
    ]);
    if (!post) response.status(404).send("Not Found");
    response.status(200).json({
      data: post,
      interactions: post.interacts,
    });
  } catch (error) {
    response.status(400).json(error);
  }
};
