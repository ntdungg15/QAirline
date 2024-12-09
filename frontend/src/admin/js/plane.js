import React, { useState } from "react";
import "../css/plane.css";

const Plane = () => {
    const [planes, setPlanes] = useState([
        // { id: 'VN001', type: 'Boeing 787', year: 2019, capacity: 330 }
    ]);

    const [newPlane, setNewPlane] = useState({
        id: '',
        type: 'Boeing 787',
        year: '',
        capacity: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPlane(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addPlane = (e) => {
        e.preventDefault();
        setPlanes([...planes, { ...newPlane, id: Date.now().toString() }]);
        setNewPlane({ id: '', type: 'Boeing 787', year: '', capacity: '' });
    };

    return (
        <div className="plane-management">
            <h1 className="plane-title">Quản Lý Máy Bay</h1>
            
            <form onSubmit={addPlane} className="plane-form">
                <div className="form-group-plane">
                    <label>Loại Máy Bay:</label>
                    <select 
                        name="type"
                        value={newPlane.type}
                        onChange={handleInputChange}
                    >
                        <option value="Boeing 787">Boeing 787</option>
                        <option value="Airbus A350">Airbus A350</option>
                        <option value="Boeing 777">Boeing 777</option>
                        <option value="Airbus A320">Airbus A320</option>
                    </select>
                </div>

                <div className="form-group-plane">
                    <label>Năm Sản Xuất:</label>
                    <input 
                        type="number" 
                        name="year"
                        value={newPlane.year}
                        onChange={handleInputChange}
                        min="1990" 
                        max="2024" 
                        required 
                    />
                </div>

                <div className="form-group-plane">
                    <label>Sức Chứa:</label>
                    <input 
                        type="number" 
                        name="capacity"
                        value={newPlane.capacity}
                        onChange={handleInputChange}
                        min="50" 
                        max="500" 
                        required 
                    />
                </div>

                <button type="submit" className="btn">Thêm Máy Bay</button>
            </form>

            <table className="plane-table">
                <thead>
                    <tr>
                        <th>Số Hiệu</th>
                        <th>Loại</th>
                        <th>Năm SX</th>
                        <th>Sức Chứa</th>
                    </tr>
                </thead>
                <tbody>
                    {planes.map((plane, index) => (
                        <tr key={plane.id}>
                            <td>{plane.id}</td>
                            <td>{plane.type}</td>
                            <td>{plane.year}</td>
                            <td>{plane.capacity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Plane;