import path from "path";

export const handlePostInformation = (req, res) => {
    try {
        // Dữ liệu text từ form
        const { title, content, category, imageUrl } = req.body;

        // Tệp đã upload (nếu có)
        const uploadedFile = req.file;

        // Kiểm tra dữ liệu
        if (!title || !content || !category) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin." });
        }

        // Log dữ liệu để kiểm tra
        console.log("Tiêu đề:", title);
        console.log("Nội dung:", content);
        console.log("Danh mục:", category);
        console.log("Đường dẫn hình ảnh:", imageUrl);
        console.log("Tệp đã upload:", uploadedFile);

        // Xử lý logic lưu dữ liệu (ví dụ: lưu vào database, lưu tệp)
        // Ở đây chỉ trả phản hồi tạm thời
        res.status(200).json({ message: "Thông tin đã được nhận thành công!" });
    } catch (error) {
        console.error("Lỗi khi xử lý yêu cầu:", error);
        res.status(500).json({ message: "Có lỗi xảy ra khi xử lý yêu cầu." });
    }
};
