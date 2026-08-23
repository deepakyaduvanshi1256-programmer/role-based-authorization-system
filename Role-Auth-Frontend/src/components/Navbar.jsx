import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar() {
  const navigate = useNavigate();

  // LocalStorage se user data
  const storedUser = localStorage.getItem("user");

  // Agar user login nahi hai
  if (!storedUser) {
    return null;
  }

  const user = JSON.parse(storedUser);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    Swal.fire({
      icon: "success",
      title: "Logout Successful",
      text: "You have been logged out.",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/");
    });
  };

  // Dashboard par jana
  const handleDashboard = () => {
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Role Auth
      </div>

      <div className="navbar-user">
        <span>
          {user.name}
        </span>

        <span>
          {user.role}
        </span>

        <button onClick={handleDashboard}>
          Dashboard
        </button>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;