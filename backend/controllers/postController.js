import Post from "../models/postModel.js"; // Sử dụng import thay cho require

// Tạo bài đăng mới
export const createPost = async (req, res) => {
  try {
    const { imageUrl, description } = req.body;

    if (!imageUrl || !description) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newPost = new Post({ imageUrl, description });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Lấy tất cả bài đăng
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};


///
export const deletePost = async (req, res) => {
    try {
      const { postId } = req.params;
  
      if (!postId) {
        return res.status(400).json({ message: "Không có ID bài đăng" });
      }
  
      // Tìm và xóa bài đăng
      const deletedPost = await Post.findByIdAndDelete(postId);
  
      if (!deletedPost) {
        return res.status(404).json({ message: "Không tìm thấy bài đăng" });
      }
  
      res.status(200).json({ 
        message: "Xóa bài đăng thành công", 
        deletedPost 
      });
    } catch (error) {
      console.error("Lỗi xóa bài đăng:", error);
      res.status(500).json({ 
        message: "Lỗi xóa bài đăng", 
        error: error.message 
      });
    }
  };