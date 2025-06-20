import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    const res = await axios.post("http://localhost:5000/api/register", {
      username, password
    });
    alert(res.data.msg || "Registered");
  };

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username, password
      });
      const token = res.data.access_token;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        navigate("/home");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="App">
      <h2>🔐 DevSync AI Login</h2>
      <input
        placeholder="GitHub Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default LoginPage;
