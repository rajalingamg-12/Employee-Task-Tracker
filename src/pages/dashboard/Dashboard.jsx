import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Navbar from "../../components/navbar/Navbar";

import {
    FaUserShield,
    FaUserTie
} from "react-icons/fa";

import "./Dashboard.css";

const Dashboard = () => {

    const { user } = useAuth();

    const navigate = useNavigate();

    const [message, setMessage] = useState("");

    const showMessage = (text) => {

        setMessage(text);

        setTimeout(() => {

            setMessage("");

        }, 3000);

    };

    const openAdminDashboard = () => {

        if (user?.role === "Admin") {

            navigate("/admin");

        } else {

            showMessage("❌ You are not authorized to access the Admin Dashboard.");

        }

    };

    const openEmployeeDashboard = () => {

        if (
            user?.role === "Employee" ||
            user?.role === "Staff"
        ) {

            navigate("/employee");

        } else {

            showMessage("❌ You are not authorized to access the Employee Dashboard.");

        }

    };

    return (

        <div className="home-dashboard-page">

            <Navbar />

            <div className="home-dashboard-container">

                <div className="home-dashboard-header">

                    <h1>
                        Welcome {user?.name}
                    </h1>

                    <p>
                        Choose your dashboard
                    </p>

                </div>

                {message && (

                    <div className="home-dashboard-message">

                        {message}

                    </div>

                )}

                <div className="home-dashboard-options">

                    <div
                        className="home-dashboard-card admin-dashboard-card"
                        onClick={openAdminDashboard}
                    >

                        <FaUserShield />

                        <h2>
                            Admin<br/> Dashboard
                        </h2>

                        <p>
                            Manage employees,
                            tasks and reports
                        </p>

                    </div>

                    <div
                        className="home-dashboard-card employee-dashboard-card"
                        onClick={openEmployeeDashboard}
                    >

                        <FaUserTie />

                        <h2>
                            Employee Dashboard
                        </h2>

                        <p>
                            Submit tasks and
                            view history
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Dashboard;