import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InforUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: "",
    email: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        throw new Error("Vui lòng đăng nhập để xem thông tin");
      }

      const response = await axios.get(
        `http://localhost:3000/api/users/inforUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
      setEditFormData({
        username: response.data.username,
        email: response.data.email,
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdateSuccess(false);
    setError(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData({
      username: user.username,
      email: user.email,
    });
    setError(null);
  };

  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/api/users/update-profile",
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);
      setIsEditing(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      setError(
        error.response?.data?.error || "Có lỗi xảy ra khi cập nhật thông tin"
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-blue-500">
          <h1 className="text-2xl font-bold text-white">Thông Tin Tài Khoản</h1>
        </div>

        {updateSuccess && (
          <div className="m-4 p-3 bg-green-100 text-green-700 rounded">
            Cập nhật thông tin thành công!
          </div>
        )}

        {error && (
          <div className="m-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        <div className="p-6 space-y-4">
          <div className="border-b pb-4">
            <p className="text-sm text-gray-600">ID Người Dùng</p>
            <p className="text-lg font-medium">{user.id}</p>
          </div>

          <div className="border-b pb-4">
            <p className="text-sm text-gray-600">Tên Người Dùng</p>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={editFormData.username}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            ) : (
              <p className="text-lg font-medium">{user.username}</p>
            )}
          </div>

          <div className="border-b pb-4">
            <p className="text-sm text-gray-600">Email</p>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            ) : (
              <p className="text-lg font-medium">{user.email}</p>
            )}
          </div>

          <div className="border-b pb-4">
            <p className="text-sm text-gray-600">Vai Trò</p>
            <p className="text-lg font-medium capitalize">{user.role}</p>
          </div>

          <div className="border-b pb-4">
            <p className="text-sm text-gray-600">Số Lượng Đặt Chỗ</p>
            <p className="text-lg font-medium">{user?.bookings?.length || 0}</p>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50">
          {isEditing ? (
            <div className="flex space-x-4">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Lưu Thay Đổi
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200"
              >
                Hủy
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditClick}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Chỉnh Sửa Thông Tin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InforUser;
