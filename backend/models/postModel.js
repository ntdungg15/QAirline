import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true } // Tự động thêm trường createdAt và updatedAt
);

const Post = mongoose.model("Post", PostSchema);

export default Post; 
