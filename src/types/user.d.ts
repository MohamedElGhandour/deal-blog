import { Document, Model } from "mongoose";

export interface User {
  username: string;
  email: string;
  password: string;
  tokens: object[];
  role: string; // ADMIN and USER
}

// Methods
export interface UserDocument extends User, Document {
  toJSON: () => any; // any for now
  generateAuthToken: () => Promise<string>;
}

// Statics
export interface UserModel extends Model<UserDocument> {
  findByCredentials(email: string, password: string): Promise<UserDocument>;
}
