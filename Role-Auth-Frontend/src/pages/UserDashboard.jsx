import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { getMyProfile } from "../services/api.js";

function UserDashboard() {
  const navigate = useNavigate();

  // User data store karne ke liye
  const [user, setUser] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // JWT token
  const token = localStorage.getItem("token");

  // Backend se latest user data lena
  const fetchProfile = async () => {
    try {
      // Token nahi hai to login page
      if (!token) {
        navigate("/");
        return;
      }

      // Backend API call
      const data = await getMyProfile(token);

      if (data.success) {
        // Latest user data state mein save
        setUser(data.user);

        // Latest data localStorage mein bhi save
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }
    } catch (error) {
      console.log(
        "Profile Error:",
        error.response?.data || error.message
      );

      // Token invalid / expired
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
        return;
      }

      // User blocked
      if (error.response?.status === 403) {
        const oldUser = localStorage.getItem("user");

        if (oldUser) {
          const blockedUser = JSON.parse(oldUser);

          setUser({
            ...blockedUser,
            isAllowed: false,
          });
        }

        return;
      }

      // Other error
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Unable to load profile",
      });
    } finally {
      setLoading(false);
    }
  };

  // Dashboard load hote hi profile fetch
  useEffect(() => {
    fetchProfile();
  }, []);

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

  // Loading
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // User data nahi hai
  if (!user) {
    return null;
  }

  // Admin ko user dashboard se admin dashboard bhejo
  if (user.role === "admin") {
    navigate("/admin");
    return null;
  }

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>

      <h2>Welcome, {user.name}</h2>

      <p>Email: {user.email}</p>

      <p>Role: {user.role}</p>

      {/* User Access Check */}
      {user.isAllowed ? (
        <div>
          <h3>Access Allowed ✅</h3>

          <p>
            Admin has allowed your account.
          </p>

          <button>
            Access Feature
          </button>
        </div>
      ) : (
        <div>
          <h3>Access Denied </h3>

          <p>
            Admin has not allowed your account yet.
          </p>
        </div>
      )}

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default UserDashboard;