import { Document, Model, Schema } from "mongoose";

const { ObjectId } = Schema.Types;

export interface Comment {
  body: string;
  post: ObjectId;
  createdBy: ObjectId;
  interactions: {
    LIKE: number;
    DISLIKE: number;
    SAD: number;
    ANGRY: number;
  };
}

// Methods
export interface CommentDocument extends Comment, Document {
  toJSON: () => any; // any for now
  //   generateAuthToken: () => Promise<string>;
}

// Statics
export interface CommentModel extends Model<CommentDocument> {
  //   findByCredentials(email: string, password: string): Promise<PostDocument>;
}
