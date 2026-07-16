import React from "react";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

import { useAuth } from "../../context/AuthContext";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaUserShield,
    FaBriefcase
} from "react-icons/fa";

import "./Profile.css";

const Profile = () => {

    const { user } = useAuth();

    return (

        <div className="profile-page">

            <Navbar />

            <div className="profile-layout">

                <Sidebar />

                <main className="profile-content">

                    <div className="profile-header">

                        <h1>
                            My Profile
                        </h1>

                        <p>
                            View your account information
                        </p>

                    </div>

                    <div className="profile-card">

                        <div className="profile-avatar">

                            <FaUser />

                        </div>

                        <h2>

                            {user?.name || "Employee"}

                        </h2>

                        <p className="profile-designation">

                            {user?.designation || "-"}

                        </p>

                        <div className="profile-info">

                            <div className="profile-item">

                                <FaEnvelope />

                                <div>

                                    <label>Email</label>

                                    <span>

                                        {user?.email || "-"}

                                    </span>

                                </div>

                            </div>

                            <div className="profile-item">

                                <FaPhone />

                                <div>

                                    <label>Mobile</label>

                                    <span>

                                        {user?.mobile || "-"}

                                    </span>

                                </div>

                            </div>

                            <div className="profile-item">

                                <FaUserShield />

                                <div>

                                    <label>Role</label>

                                    <span>

                                        {user?.role || "-"}

                                    </span>

                                </div>

                            </div>

                            <div className="profile-item">

                                <FaBriefcase />

                                <div>

                                    <label>Designation</label>

                                    <span>

                                        {user?.designation || "-"}

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>

    );

};

export default Profile;