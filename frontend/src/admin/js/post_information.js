import React, { useState, useEffect } from "react";

const Post_information = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [posts, setPosts] = useState([]);

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
            console.log(postId);
            const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Cập nhật danh sách bài đăng sau khi xóa
                setPosts(posts.filter(post => post._id !== postId));
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

            {/* Danh sách bài đăng */}
            <div style={{ marginTop: "20px" }}>
                <h2>Các bài đăng</h2>
                {posts.map((post) => (
                    <div
                        key={post._id}
                        style={{
                            marginBottom: "20px",
                            border: "1px solid #ddd",
                            padding: "10px",
                            position: "relative"
                        }}
                    >
                        <img
                            src={post.imageUrl}
                            alt="Post"
                            style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
                        />
                        <p>{post.description}</p>
                        <button
                            onClick={() => handleDeletePost(post._id)}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                backgroundColor: "red",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer"
                            }}
                        >
                            Xóa
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Post_information;
