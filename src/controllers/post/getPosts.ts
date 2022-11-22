//  Packages
import validator from "validator";

//  Types
import { RequestHandler } from "express";

//  Models
import Post from "../../models/Post/post.model";

//  Enum
import { STATUS } from "../../types/enum";

export const posts: RequestHandler = async (
  request: Request | any,
  response,
  next
) => {
  const pageQuery = validator.isNumeric(request.query.page)
    ? +request.query.page
    : 1; // start at 1
  const page = pageQuery < 1 ? 1 : pageQuery;
  const limitQuery = validator.isNumeric(request.query.limit)
    ? +request.query.limit
    : 10; // Default limit equals 10.
  const limit = limitQuery < 1 ? 10 : limitQuery;
  const skip = limit * (page - 1);
  const filter = request.isAdmin ? {} : { status: STATUS.APPROVED };
  try {
    const posts = await Post.find(filter)
      .populate([
        {
          path: "createdBy",
          select: "-__v -password -tokens -createdAt -updatedAt",
        },
      ])
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(limit);
    const total = await Post.find(filter).countDocuments();
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page + 1 <= totalPages;
    const hasPrevPage = page > 1;
    response.status(200).json({
      data: posts,
      total,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPrevPage,
    });
  } catch (error) {
    next(error);
  }
};
