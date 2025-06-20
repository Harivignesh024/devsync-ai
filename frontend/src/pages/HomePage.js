import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="App">
      <h2>🚀 Welcome {username}</h2>
      <button onClick={() => navigate("/dashboard")}>🏠 My Dashboard</button>
      <button onClick={() => navigate("/team")}>👥 Team Dashboard</button>
      <br /><br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default HomePage;
