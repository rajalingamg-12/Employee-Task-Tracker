import React from "react";
import "./Navbar.css";
import logo from "../../assets/T-logo.png";

import {
    FaUserCircle,
    FaSignOutAlt
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <header className="navbar">

            <div className="navbar-left">

                <img
                    src={logo}
                    alt="Techie Crew"
                    className="company-logo"
                />

                <div className="company-details">

                    <h3>Techie Crew</h3>

                    <span>Business Consultancy & IT Desk</span>

                </div>

            </div>

            <div className="navbar-center">

                <h2>
                    Employee Task Tracker
                </h2>

            </div>

            <div className="navbar-right">

                <div className="user-info">

                    <FaUserCircle className="user-icon" />

                    <div>

                        <h4>

                            {user?.name || "User"}

                        </h4>

                        <p>

                            {user?.role}

                        </p>

                    </div>

                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </header>

    );

}

export default Navbar;