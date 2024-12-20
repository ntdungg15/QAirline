import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/inforuser.css';

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
    const [selectedSection, setSelectedSection] = useState("info");

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


    const handleMenuClick = (section) => {
        setSelectedSection(section);
    };

    return (

        <div className="infoUser-container">
            <div className="dashboard-container">
                {/* Sidebar Menu */}
                <div className="dashboard-sidebar">
                    <ul className="sidebar-menu">
                        <li
                            className={selectedSection === "info" ? "active" : ""}
                            onClick={() => handleMenuClick("info")}
                        >
                            Thông Tin Tài Khoản
                        </li>
                        <li
                            className={selectedSection === "settings" ? "active" : ""}
                            onClick={() => handleMenuClick("settings")}
                        >
                            Cài Đặt
                        </li>
                        <li
                            className={selectedSection === "history" ? "active" : ""}
                            onClick={() => handleMenuClick("history")}
                        >
                            Lịch Sử Đặt Chỗ
                        </li>
                        <li
                            className={selectedSection === "support" ? "active" : ""}
                            onClick={() => handleMenuClick("support")}
                        >
                            Hỗ Trợ
                        </li>
                    </ul>
                </div>
                <div className="dashboard-content">
                    {selectedSection === "info" && (
                        <div className="infoUser-card">
                            <div className="infoUser-header">
                                <h1 className="infoUser-title">Thông Tin Tài Khoản</h1>
                            </div>

                            {updateSuccess && (
                                <div className="infoUser-alert infoUser-alert-success">
                                    Cập nhật thông tin thành công!
                                </div>
                            )}

                            {error && (
                                <div className="infoUser-alert infoUser-alert-error">{error}</div>
                            )}

                            <div className="infoUser-content">
                                <div className="infoUser-field">
                                    <p className="infoUser-label">ID Người Dùng</p>
                                    <p className="infoUser-value">{user.id}</p>
                                </div>

                                <div className="infoUser-field">
                                    <p className="infoUser-label">Tên Người Dùng</p>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="username"
                                            value={editFormData.username}
                                            onChange={handleInputChange}
                                            className="infoUser-input"
                                            required
                                        />
                                    ) : (
                                        <p className="infoUser-value">{user.username}</p>
                                    )}
                                </div>

                                <div className="infoUser-field">
                                    <p className="infoUser-label">Email</p>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={editFormData.email}
                                            onChange={handleInputChange}
                                            className="infoUser-input"
                                            required
                                        />
                                    ) : (
                                        <p className="infoUser-value">{user.email}</p>
                                    )}
                                </div>

                                <div className="infoUser-field">
                                    <p className="infoUser-label">Vai Trò</p>
                                    <p className="infoUser-value capitalize">{user.role}</p>
                                </div>

                                <div className="infoUser-field">
                                    <p className="infoUser-label">Số Lượng Đặt Chỗ</p>
                                    <p className="infoUser-value">{user?.bookings?.length || 0}</p>
                                </div>
                            </div>

                            <div className="infoUser-footer">
                                {isEditing ? (
                                    <div className="infoUser-button-group">
                                        <button
                                            onClick={handleSubmit}
                                            className="infoUser-button infoUser-button-primary"
                                        >
                                            Lưu Thay Đổi
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="infoUser-button infoUser-button-secondary"
                                        >
                                            Hủy
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleEditClick}
                                        className="chinh-infor"
                                    >
                                        Chỉnh Sửa Thông Tin
                                    </button>
                                )}
                            </div>
                        </div>
                        )}

                </div>
            </div>

        </div>
    );
};

export default InforUser;
