import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./components/login";
import Registration from "./components/registration";
import ForgotPassword from "./components/forgotpassword";
import Home from "./components/Home";
import Profile from "./components/profile";
import Leaderboard from "./components/leaderboard"; 

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/users")
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
            
            {/* Display Users List */}
            <div>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name} - {user.email}</li>
                    ))}
                </ul>
            </div>
        </Router>
    );
};

export default App;
