import { model, Schema } from "mongoose";
import { CommentDocument, CommentModel } from "../../types/comment";
import { toJSON } from "./functions/index";

const { ObjectId } = Schema.Types;

const commentSchema = {
  body: {
    type: String,
    required: true,
    trim: true,
  },
  post: {
    type: ObjectId,
    required: true,
    ref: "Post",
  },
  createdBy: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  interactions: {
    LIKE: { type: Number, default: 0 },
    DISLIKE: { type: Number, default: 0 },
    SAD: { type: Number, default: 0 },
    ANGRY: { type: Number, default: 0 },
  },
};

const options = {
  timestamps: true,
};

const schema: Schema<CommentDocument> = new Schema(commentSchema, options);

schema.methods.toJSON = toJSON;

const Comment = model<CommentDocument, CommentModel>("Comment", schema);

export = Comment;
