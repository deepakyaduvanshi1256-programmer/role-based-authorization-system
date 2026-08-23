import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  getAllUsers,
  allowUser,
  blockUser,
  deleteUser,
} from "../services/api.js";

function AdminDashboard() {
  // Saare users ko store karne ke liye
  const [users, setUsers] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Logged-in admin ka token
  const token = localStorage.getItem("token");

  // Users database se fetch karna
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getAllUsers(token);

      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Unable to fetch users",
      });
    } finally {
      setLoading(false);
    }
  };

  // Page load hote hi users fetch karo
  useEffect(() => {
    fetchUsers();
  }, []);

  // Allow user
  const handleAllow = async (id) => {
    try {
      const data = await allowUser(id, token);

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "User Allowed",
          text: data.message,
        });

        fetchUsers();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Allow Failed",
        text:
          error.response?.data?.message ||
          "Unable to allow user",
      });
    }
  };

  // Block user
  const handleBlock = async (id) => {
    try {
      const data = await blockUser(id, token);

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "User Blocked",
          text: data.message,
        });

        fetchUsers();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Block Failed",
        text:
          error.response?.data?.message ||
          "Unable to block user",
      });
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete User?",
      text: "This user will be permanently deleted.",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const data = await deleteUser(id, token);

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: data.message,
        });

        fetchUsers();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error.response?.data?.message ||
          "Unable to delete user",
      });
    }
  };

  // Loading screen
  if (loading) {
    return <h2>Loading Users...</h2>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <p>
        Manage users, allow access, block users, or delete users.
      </p>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>
                {user.role === "admin" ? (
                  <span>Admin</span>
                ) : user.isAllowed ? (
                  <span>Allowed</span>
                ) : (
                  <span>Blocked</span>
                )}
              </td>

              <td>
                {user.role !== "admin" && (
                  <>
                    {user.isAllowed ? (
                      <button
                        onClick={() =>
                          handleBlock(user._id)
                        }
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleAllow(user._id)
                        }
                      >
                        Allow
                      </button>
                    )}

                    <button
                      onClick={() =>
                        handleDelete(user._id)
                      }
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;