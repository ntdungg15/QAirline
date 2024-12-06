import React, { useState, useEffect } from "react";
import { authService } from "../../services/auth";

const Post_information = () => {

    return (

        <div class="admin-infor">
            <span>POST INFORMATION</span>
            <form>
                <div>
                    <label>Tiêu Đề</label>
                    <input type="text" name="title" required />
                </div>

                <div class="post-content">
                    <label>Nội Dung</label>
                    <textarea className="content" required rows="4"></textarea>
                </div>

                <div>
                    <label>Danh Mục</label>
                    <select name="category">
                        <option value="">Chọn Danh Mục</option>
                        <option value="news">Tin Tức</option>
                        <option value="events">Sự Kiện</option>
                        <option value="announcements">Thông Báo</option>
                    </select>
                </div>

                <div>
                    <label>Đường Dẫn Hình Ảnh</label>
                    <input type="url" name="imageUrl" />
                </div>

                <div>
                    <button type="submit">Đăng Thông Tin</button>
                </div>
            </form>
        </div>

    );
};

export default Post_information;
