import React from "react";
import "./App.css";
import Login from "./components/js/login"; // Nhập Login component
import Homepage from "./pages/js/Homepage";
import Landingpage from "./pages/js/Landingpage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./pages/js/AdminDashboard";
import UserDashboard from "./pages/js/UserDashboard";
import { authService } from "./services/auth";
// import Register from './components/js/register';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = authService.getCurrentUser();
  const [userRole, setUserRole] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkRole = async () => {
      if (user) {
        const role = await authService.getUserRole(user.uid);
        setUserRole(role);
      }
      setLoading(false);
    };
    checkRole();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || userRole !== allowedRole) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute allowedRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </div>
    </Router>

    // <div className="App">
    //   <Homepage />
    //   <Login />
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <comde>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;