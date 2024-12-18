import { useState, useEffect } from "react";
import axios from "axios";
import { authService } from "../services/auth";

const usePlaneManagement = () => {
  const [state, setState] = useState({
    planes: [],
    isEditing: false,
    formData: {
      manufacturer: "",
      model: "",
      totalSeats: "",
      seatConfiguration: {
        economy: {
          total: "",
          rows: "",
          seatsPerRow: "",
        },
        business: {
          total: "",
          rows: "",
          seatsPerRow: "",
        },
      },
    },
  });

  const fetchAircrafts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/aircrafts");
      setState((prev) => ({
        ...prev,
        planes: response.data,
      }));
    } catch (error) {
      console.error("Error fetching aircrafts:", error);
      alert("Không thể lấy danh sách máy bay");
    }
  };

  useEffect(() => {
    fetchAircrafts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setState((prev) => ({
        ...prev,
        formData: {
          ...prev.formData,
          seatConfiguration: {
            ...prev.formData.seatConfiguration,
            [section]: {
              ...prev.formData.seatConfiguration[section],
              [field]: value,
            },
          },
        },
      }));
    } else {
      setState((prev) => ({
        ...prev,
        formData: {
          ...prev.formData,
          [name]: value,
        },
      }));
    }

    if (name.includes("total")) {
      const economyTotal = name.includes("economy")
        ? parseInt(value) || 0
        : parseInt(state.formData.seatConfiguration.economy.total) || 0;
      const businessTotal = name.includes("business")
        ? parseInt(value) || 0
        : parseInt(state.formData.seatConfiguration.business.total) || 0;

      setState((prev) => ({
        ...prev,
        formData: {
          ...prev.formData,
          totalSeats: economyTotal + businessTotal,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state.isEditing) {
        await axios.put(
          `http://localhost:3000/api/aircrafts/${state.formData.id}`,
          state.formData
        );
        alert("Cập nhật máy bay thành công");
      } else {
        await axios.post("http://localhost:3000/api/aircrafts", state.formData);
        alert("Thêm máy bay thành công");
      }
      fetchAircrafts();
      resetForm();
    } catch (error) {
      console.error("Error saving aircraft:", error);
      alert(
        state.isEditing
          ? "Không thể cập nhật máy bay"
          : "Không thể thêm máy bay"
      );
    }
  };

  const handleEdit = (plane) => {
    setState((prev) => ({
      ...prev,
      isEditing: true,
      formData: plane,
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa máy bay này?")) {
      try {
        await axios.delete(`/api/aircrafts/${id}`);
        alert("Xóa máy bay thành công");
        fetchAircrafts();
      } catch (error) {
        console.error("Error deleting aircraft:", error);
        alert("Không thể xóa máy bay");
      }
    }
  };

  const resetForm = () => {
    setState((prev) => ({
      ...prev,
      isEditing: false,
      formData: {
        manufacturer: "",
        model: "",
        totalSeats: "",
        seatConfiguration: {
          economy: {
            total: "",
            rows: "",
            seatsPerRow: "",
          },
          business: {
            total: "",
            rows: "",
            seatsPerRow: "",
          },
        },
      },
    }));
  };

  return {
    state,
    handleInputChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  };
};

export default usePlaneManagement;
