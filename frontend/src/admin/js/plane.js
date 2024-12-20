import React from "react";
import usePlaneManagement from "../../hooks/usePlaneManagement";
import "../css/plane.css";

const Plane = () => {
  const {
    state,
    handleInputChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = usePlaneManagement();

  return (
    <div className="plane-management">
      <h1 className="plane-title">Quản Lý Máy Bay</h1>

      <form onSubmit={handleSubmit} className="plane-form">
        <div className="form-group-plane">
          <label>Hãng Sản Xuất:</label>
          <input
            type="text"
            name="manufacturer"
            value={state.formData.manufacturer}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group-plane">
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={state.formData.model}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-section">
          <h3>Cấu hình ghế Phổ thông</h3>
          <div className="form-group-plane">
            <label>Số lượng ghế:</label>
            <input
              type="number"
              name="economy.total"
              value={state.formData.seatConfiguration.economy.total}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group-plane">
            <label>Số hàng:</label>
            <input
              type="number"
              name="economy.rows"
              value={state.formData.seatConfiguration.economy.rows}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group-plane">
            <label>Ghế mỗi hàng:</label>
            <input
              type="number"
              name="economy.seatsPerRow"
              value={state.formData.seatConfiguration.economy.seatsPerRow}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Cấu hình ghế Thương gia</h3>
          <div className="form-group-plane">
            <label>Số lượng ghế:</label>
            <input
              type="number"
              name="business.total"
              value={state.formData.seatConfiguration.business.total}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group-plane">
            <label>Số hàng:</label>
            <input
              type="number"
              name="business.rows"
              value={state.formData.seatConfiguration.business.rows}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group-plane">
            <label>Ghế mỗi hàng:</label>
            <input
              type="number"
              name="business.seatsPerRow"
              value={state.formData.seatConfiguration.business.seatsPerRow}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group-plane">
          <label>Tổng số ghế:</label>
          <input
            type="number"
            name="totalSeats"
            value={state.formData.totalSeats}
            readOnly
          />
        </div>

        <button type="submit" className="btn">
          {state.isEditing ? "Cập nhật Máy Bay" : "Thêm Máy Bay"}
        </button>
        {state.isEditing && (
          <button type="button" className="btn" onClick={resetForm}>
            Hủy
          </button>
        )}
      </form>

      <table className="plane-table">
        <thead>
          <tr>
            <th>Hãng SX</th>
            <th>Model</th>
            <th>Tổng ghế</th>
            <th>Ghế Phổ thông</th>
            <th>Ghế Thương gia</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {state.planes.map((plane) => (
            <tr key={plane.id}>
              <td>{plane.manufacturer}</td>
              <td>{plane.model}</td>
              <td>{plane.totalSeats}</td>
              <td>{`${plane.seatConfiguration.economy.total} 
                                (${plane.seatConfiguration.economy.rows} x 
                                ${plane.seatConfiguration.economy.seatsPerRow})`}</td>
              <td>{`${plane.seatConfiguration.business.total} 
                                (${plane.seatConfiguration.business.rows} x 
                                ${plane.seatConfiguration.business.seatsPerRow})`}</td>
              <td>
                <button
                  className="btn-action"
                  onClick={() => handleEdit(plane)}
                >
                  Sửa
                </button>
                <button
                  className="btn-action"
                  onClick={() => handleDelete(plane.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Plane;
