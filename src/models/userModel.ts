import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    image: {
      publicId: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", postSchema);
export default User;
