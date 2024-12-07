// src/hooks/usePathTracker.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePathTracker = () => {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("currentPath", location.pathname);
  }, [location.pathname]);
};
