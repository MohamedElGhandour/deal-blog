import { Document, Model, Schema } from "mongoose";

const { ObjectId } = Schema.Types;

export interface Post {
  title: string;
  body: string;
  status: string;
  createdBy: ObjectId;
  interactions: {
    LIKE: number;
    DISLIKE: number;
    SAD: number;
    ANGRY: number;
  };
}

// Methods
export interface PostDocument extends Post, Document {
  toJSON: () => any; // any for now
  //   generateAuthToken: () => Promise<string>;
}

// Statics
export interface PostModel extends Model<PostDocument> {
  //   findByCredentials(email: string, password: string): Promise<PostDocument>;
}
