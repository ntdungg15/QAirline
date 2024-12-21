import React, { useState, useEffect } from "react";
import '../css/post_information.css';
const Post_information = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [posts, setPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // Quản lý ảnh đang hiển thị

    // Fetch bài đăng
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/posts");
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    // Hiệu ứng chuyển đổi ảnh mỗi 3 giây
    useEffect(() => {
        if (posts.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [posts]);

    // Hàm submit bài đăng
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/posts/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageUrl, description }),
            });

            if (response.ok) {
                alert("Tạo bài đăng thành công!");
                // Fetch lại danh sách bài đăng sau khi tạo
                const updatedResponse = await fetch("http://localhost:3000/api/posts");
                const updatedData = await updatedResponse.json();
                setPosts(updatedData);

                // Xóa nội dung input
                setImageUrl("");
                setDescription("");
            } else {
                alert("Không thể tạo bài đăng.");
            }
        } catch (error) {
            console.error("Lỗi:", error);
        }
    };

    // Hàm xóa bài đăng
    const handleDeletePost = async (postId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Cập nhật danh sách bài đăng sau khi xóa
                setPosts(posts.filter((post) => post._id !== postId));
                alert("Xóa bài đăng thành công!");
            } else {
                alert("Không thể xóa bài đăng.");
            }
        } catch (error) {
            console.error("Lỗi xóa bài đăng:", error);
        }
    };
    return (
        <div className="post-info-dashboard">
            <h1 className="post-info-title">Admin Dashboard</h1>

            {/* Post Creation Form */}
            <form className="post-creation-form" onSubmit={handleSubmit}>
                <div className="post-form-group">
                    <label className="post-form-label">URL Ảnh:</label>
                    <input
                        type="text"
                        className="post-image-url-input"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <label>Chọn Tệp Ảnh:</label>
                    <input className="fileUpload" type="file" id="fileUpload" accept=".png, .jpg" />
                </div>
                <div className="post-form-group">
                    <label className="post-form-label">Mô tả:</label>
                    <textarea
                        className="post-description-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit" className="post-submit-btn">Đăng</button>
            </form>

            {/* Slideshow */}
            <div className="post-slideshow">
                <div className="post-slideshow-wrapper">
                    {posts.map((post, index) => (
                        <img
                            key={post._id}
                            src={post.imageUrl}
                            alt="Post"
                            className={`post-slide ${index === currentIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>

            {/* Post Management Section */}
            <div className="post-management">
                <h2 className="post-management-title">Quản lý bài đăng</h2>
                <div className="post-list">
                    {posts.map((post) => (
                        <div className="post-card" key={post._id}>
                            <img
                                src={post.imageUrl}
                                alt="Post"
                                className="post-card-image"
                            />
                            <p className="post-card-description">{post.description}</p>
                            <button 
                                className="post-delete-btn"
                                onClick={() => handleDeletePost(post._id)}
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Post_information;
