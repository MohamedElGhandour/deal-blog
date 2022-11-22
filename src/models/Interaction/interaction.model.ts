import { model, Schema } from "mongoose";
import { InteractionDocument, InteractionModel } from "../../types/interaction";
import { Types } from "../../types/enum";
import { toJSON } from "./functions/index";

const { ObjectId } = Schema.Types;

const interactionSchema = {
  type: {
    type: String,
    required: true,
    trim: true,
    enum: Types,
  },
  post: {
    type: ObjectId,
    required: true,
    ref: "Post",
  },
  comment: {
    type: ObjectId,
    ref: "Comment",
  },
  createdBy: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
};

const options = {
  timestamps: true,
};

const schema: Schema<InteractionDocument> = new Schema(
  interactionSchema,
  options
);

schema.methods.toJSON = toJSON;

schema.pre("validate", function (next) {
  if ((this.post && this.comment) || (!this.post && !this.comment))
    return next(
      new Error(
        "At least and Only one field(parent, shelter) should be populated"
      )
    );
  next();
});

const Interaction = model<InteractionDocument, InteractionModel>(
  "Interaction",
  schema
);

export = Interaction;
