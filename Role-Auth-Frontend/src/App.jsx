import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./Login.jsx";
import Register from "./Register.jsx";

import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        {/* Login / Register */}
        <Route
          path="/" element={showRegister ? ( <Register   onLogin={() => setShowRegister(false)}/>) :
           (  <Login  onSignup={() => setShowRegister(true)}
              />
            )
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* User Dashboard */}
        <Route
          path="/user"
          element={<UserDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;





