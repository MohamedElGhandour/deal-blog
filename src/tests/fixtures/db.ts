import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../../models/User/user.model";
import Post from "../../models/Post/post.model";

const adminId = new mongoose.Types.ObjectId();

const admin = {
  _id: adminId,
  name: "Mohamed",
  email: "Mohamed@example.com",
  password: "56what!!",
  role: "ADMIN",
  tokens: [
    {
      token: jwt.sign(
        { _id: adminId, email: "Mohamed@example.com" },
        process.env.SECRET_KEY as string
      ),
    },
  ],
};

const userId = new mongoose.Types.ObjectId();

const user = {
  _id: userId,
  name: "ahmed",
  email: "ahmed@example.com",
  password: "56what!!",
  role: "USER",
  tokens: [
    {
      token: jwt.sign(
        { _id: userId, email: "ahmed@example.com" },
        process.env.SECRET_KEY as string
      ),
    },
  ],
};

const userPost = {
  _id: new mongoose.Types.ObjectId(),
  title: "test",
  body: "test",
  createdBy: userId,
};

const adminPost = {
  _id: new mongoose.Types.ObjectId(),
  title: "test",
  body: "test",
  createdBy: adminId,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Post.deleteMany();
  await new User(user).save();
  await new User(admin).save();
  await new Post(userPost).save();
  await new Post(adminPost).save();
};

export { user, admin, userPost, adminPost, setupDatabase };
