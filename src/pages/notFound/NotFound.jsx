import React from "react";
import "./NotFound.css";

import { useNavigate } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

function NotFound() {

    const navigate = useNavigate();

    return (

        <div className="notfound-page">

            <div className="notfound-card">

                <div className="notfound-icon">

                    <FaExclamationTriangle />

                </div>

                <h1>404</h1>

                <h2>Page Not Found</h2>

                <p>
                    The page you are looking for doesn't exist or has been moved.
                </p>

                <button
                    className="home-btn"
                    onClick={() => navigate("/login")}
                >

                    <FaHome />

                    Back to Login

                </button>

            </div>

        </div>

    );

}

export default NotFound;