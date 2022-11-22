import { model, Schema } from "mongoose";
import { UserDocument, UserModel } from "../../types/user";
import { Role } from "../../types/enum";
import { toJSON, generateAuthToken, hashPassword } from "./functions/index";
import myError from "../../utility/myError";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = {
  username: {
    type: String,
    required: true,
    trim: true,
    validate(value: string) {
      if (!/^[a-zA-Z ]*$/.test(value)) {
        throw new Error(
          "This name contains certain characters that aren't allowed."
        );
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  role: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    enum: Role,
    default: "USER",
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
};

const options = {
  timestamps: true,
};

const schema: Schema<UserDocument> = new Schema(userSchema, options);

schema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "createdBy",
});

//  Handle unnecessary extras
schema.methods.toJSON = toJSON;

//  Create an authentication token
schema.methods.generateAuthToken = generateAuthToken;

//  To verify that the registration data is correct
schema.statics.findByCredentials = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user)
    throw new (myError as any)(
      "The email address you entered isn't connected to an account."
    );
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    throw new (myError as any)(
      "The password that you've entered is incorrect."
    );
  return user;
};

//  Hash the plain text password before saving
schema.pre("save", hashPassword);

const User = model<UserDocument, UserModel>("User", schema);

export = User;
