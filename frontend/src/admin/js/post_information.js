import React, { useState } from "react";

const Post_information = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        imageUrl: "",
        file: null,
    });

    const [successMessage, setSuccessMessage] = useState("");

    // Hàm xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Hàm xử lý file upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            file: file,
        }));
    };

    // Hàm gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Tạo formData object để gửi cả text và file
        const payload = new FormData();
        payload.append("title", formData.title);
        payload.append("content", formData.content);
        payload.append("category", formData.category);
        payload.append("imageUrl", formData.imageUrl);
        if (formData.file) {
            payload.append("file", formData.file);
        }

        try {
            // Gửi dữ liệu tới backend
            const response = await fetch("/api/posts", {
                method: "POST",
                body: payload,
            });

            if (response.ok) {
                setSuccessMessage("Đăng thông tin thành công!");
                setFormData({
                    title: "",
                    content: "",
                    category: "",
                    imageUrl: "",
                    file: null,
                });
            } else {
                const errorData = await response.json();
                alert(`Lỗi: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            alert("Có lỗi xảy ra khi gửi dữ liệu.");
        }
    };

    return (
        <div className="admin-infor">
            <span>POST INFORMATION</span>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                

                <div>
                    <label>Đường Dẫn Hình Ảnh</label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <input
                        type="file"
                        id="fileUpload"
                        accept=".png, .jpg"
                        onChange={handleFileChange}
                    />
                </div>

                <div>
                    <button type="submit">Đăng Thông Tin</button>
                </div>
            </form>
        </div>
    );
};

export default Post_information;