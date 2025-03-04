import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./all.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    const { username, password } = credentials;

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/home"); // Redirect on successful login
      } else {
        setErrorMessage(data.error || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" name="username" className="form-control" placeholder="Username" value={credentials.username} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" className="form-control" placeholder="Password" value={credentials.password} onChange={handleChange} required />
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="button" type="submit">
          Login
        </button>
      </form>

      <div className="auth-links">
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <p>
          Forgot your password? <Link to="/forgot-password">Reset Password</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
