import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Login
export const loginUser = async (data) => {
  const response = await API.post("/auth/login", data);

  return response.data;
};

// Register
export const registerUser = async (data) => {
  const response = await API.post("/auth/register", data);

  return response.data;
};

// Get All Users
export const getAllUsers = async (token) => {
  const response = await API.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Create User
export const createUser = async (data, token) => {
  const response = await API.post("/users", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get Single User
export const getUserById = async (id, token) => {
  const response = await API.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get My Profile
export const getMyProfile = async (token) => {
  const response = await API.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update User
export const updateUser = async (id, data, token) => {
  const response = await API.put(`/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Delete User
export const deleteUser = async (id, token) => {
  const response = await API.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Allow User
export const allowUser = async (id, token) => {
  const response = await API.patch(
    `/users/${id}/allow`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Block User
export const blockUser = async (id, token) => {
  const response = await API.patch(
    `/users/${id}/block`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export default API;