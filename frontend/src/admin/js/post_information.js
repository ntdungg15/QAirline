import React, { useState, useEffect } from "react";

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
            }, 3000);
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
        <div>
        <h1>Admin Dashboard</h1>

        {/* Form tạo bài đăng */}
        <form onSubmit={handleSubmit}>
            <div>
                <label>URL Ảnh:</label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </div>
            <div>
                <label>Mô tả:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit">Đăng</button>
        </form>

        {/* Hiển thị ảnh dạng xếp lớp */}
        <div className="post-container">
            <div className="post-image-container">
                {posts.map((post, index) => (
                    <img
                        key={post._id}
                        src={post.imageUrl}
                        alt="Post"
                        className={index === currentIndex ? "active" : ""}
                    />
                ))}
            </div>
        </div>

        {/* Danh sách bài đăng cho quản lý */}
        <div className="post-list">
            <h2>Quản lý bài đăng</h2>
            {posts.map((post) => (
                <div className="post-item" key={post._id}>
                    <img
                        src={post.imageUrl}
                        alt="Post"
                    />
                    <p>{post.description}</p>
                    <button onClick={() => handleDeletePost(post._id)}>
                        Xóa
                    </button>
                </div>
            ))}
        </div>
    </div>
    );
};

export default Post_information;