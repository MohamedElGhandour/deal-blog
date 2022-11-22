import { model, Schema } from "mongoose";
import { PostDocument, PostModel } from "../../types/post";
import { STATUS } from "../../types/enum";
import { toJSON } from "./functions/index";

const { ObjectId } = Schema.Types;

const postSchema = {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String, // ADMIN and USER
    required: true,
    uppercase: true,
    trim: true,
    enum: STATUS,
    default: "PENDING",
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

const schema: Schema<PostDocument> = new Schema(postSchema, options);

schema.methods.toJSON = toJSON;

const Post = model<PostDocument, PostModel>("Post", schema);

export = Post;
