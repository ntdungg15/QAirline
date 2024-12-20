import React from "react";

const Blog = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Đây là nội dung chi tiết của bài viết: {title}</p>
    </div>
  );
};

export default Blog;