import { Document, Model, Schema } from "mongoose";

const { ObjectId } = Schema.Types;

export interface Interaction {
  type: string;
  post: ObjectId;
  comment: ObjectId;
  createdBy: ObjectId;
}

// Methods
export interface InteractionDocument extends Interaction, Document {
  toJSON: () => any; // any for now
  //   generateAuthToken: () => Promise<string>;
}

// Statics
export interface InteractionModel extends Model<InteractionDocument> {
  //   findByCredentials(email: string, password: string): Promise<PostDocument>;
}
