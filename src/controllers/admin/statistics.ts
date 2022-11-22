//  Types
import { RequestHandler } from "express";

//  Models
import Post from "../../models/Post/post.model";
import Comment from "../../models/Comment/comment.model";
import Interaction from "../../models/Interaction/interaction.model";

//  Enum
import { STATUS } from "../../types/enum";

export const statistics: RequestHandler = async (
  request: Request | any,
  response,
  next
) => {
  if (!request.isAdmin)
    return next({
      statusText: "FAILED",
      message: "Sorry, this service is not available",
    });
  try {
    const totalNumberOfPendingPosts = await Post.find({
      status: STATUS.PENDING,
    }).countDocuments();

    const totalNumberOfApprovedPosts = await Post.find({
      status: STATUS.APPROVED,
    }).countDocuments();

    const totalNumberOfRejectedPosts = await Post.find({
      status: STATUS.REJECTED,
    }).countDocuments();

    const totalNumberOfPosts = await Post.find({}).countDocuments();

    const totalNumberOfComments = await Comment.find({}).countDocuments();

    const totalNumberOfInteractionsOnPosts = await Interaction.find({
      post: { $ne: null },
    }).countDocuments();

    const totalNumberOfInteractionsOnComments = await Interaction.find({
      comment: { $ne: null },
    }).countDocuments();

    const totalNumberOfInteractions = await Interaction.find(
      {}
    ).countDocuments();

    return response.status(200).json({
      totalNumberOfPendingPosts,
      totalNumberOfApprovedPosts,
      totalNumberOfRejectedPosts,
      totalNumberOfPosts,
      totalNumberOfComments,
      totalNumberOfInteractionsOnPosts,
      totalNumberOfInteractionsOnComments,
      totalNumberOfInteractions,
    });
  } catch (error) {
    return next(error);
  }
};
