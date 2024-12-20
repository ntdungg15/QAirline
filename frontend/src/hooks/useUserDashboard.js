import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth";

export const useUserDashboard = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState({
    fromLocation: "",
    toLocation: "",
  });
  const [activeTab, setActiveTab] = useState("flight");
  const [videoOffset, setVideoOffset] = useState(0);
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleflightClick = () => {
    // window.location.href = '/login';
  };

  // Location handlers
  const handleFromLocationSelect = (location) => {
    setLocations((prevLocations) => ({
      ...prevLocations,
      fromLocation: location,
    }));
  };

  // Location handlers
  const handleToLocationSelect = (location) => {
    setLocations((prevLocations) => ({
      ...prevLocations,
      toLocation: location,
    }));
  };

  // Tìm chuyến bay
  const handleSearchFlights = () => {
    const { fromLocation, toLocation } = locations;
    const url = `user/book-ticket?from=${fromLocation}&to=${toLocation}`;
    window.open(url, "_blank");
  };

  // Hàm đăng xuất
  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Tab handler
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const maxOffset = window.innerHeight * 0.95;
      const scrollY = window.scrollY;
      setVideoOffset(Math.min(scrollY, maxOffset));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Posts fetching and rotation
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

  useEffect(() => {
    if (posts.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [posts]);

  return {
    locations,
    activeTab,
    videoOffset,
    posts,
    currentIndex,
    handleFromLocationSelect,
    handleToLocationSelect,
    handleSearchFlights,
    handleLogout,
    handleTabClick,
    handleflightClick,
  };
};
