import React from "react";
import "./Sidebar.css";

import {
    FaHome,
    FaTasks,
    FaHistory,
    FaUsers,
    FaUser,
    FaChartBar
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


function Sidebar() {


    const { user } = useAuth();


    const menuClass = ({ isActive }) =>
        isActive
            ? "menu-item active"
            : "menu-item";



    return (

        <aside className="sidebar">


            <div className="sidebar-title">

                <h3>
                    Menu
                </h3>

            </div>



            <nav className="sidebar-menu">



                {/* =========================
                    ADMIN MENU
                ========================= */}


                {
                    user?.role === "Admin" && (

                        <>


                            {/* Dashboard */}

                            <NavLink
                                to="/admin"
                                className={menuClass}
                                end
                            >

                                <FaHome />

                                <span>
                                    Dashboard
                                </span>


                            </NavLink>




                            {/* All Tasks */}

                            <NavLink
                                to="/admin/tasks"
                                className={menuClass}
                            >

                                <FaTasks />

                                <span>
                                    All Tasks
                                </span>


                            </NavLink>




                            {/* Submit Task */}

                            <NavLink
                                to="/task"
                                className={menuClass}
                            >

                                <FaTasks />

                                <span>
                                    Submit Task
                                </span>


                            </NavLink>





                            {/* Employees */}

                            <NavLink
                                to="/employees"
                                className={menuClass}
                            >

                                <FaUsers />

                                <span>
                                    Employees
                                </span>


                            </NavLink>





                            {/* Reports */}

                            <NavLink
                                to="/admin/reports"
                                className={menuClass}
                            >

                                <FaChartBar />

                                <span>
                                    Reports
                                </span>


                            </NavLink>



                        </>

                    )
                }






                {/* =========================
                    EMPLOYEE MENU
                ========================= */}



                {
                    (
                        user?.role === "Employee" ||
                        user?.role === "Staff"
                    )
                    &&

                    (

                        <>


                            {/* Dashboard */}

                            <NavLink
                                to="/employee"
                                end
                                className={menuClass}
                            >

                                <FaHome />

                                <span>
                                    Dashboard
                                </span>


                            </NavLink>






                            {/* Submit Task */}

                            <NavLink
                                to="/task"
                                className={menuClass}
                            >

                                <FaTasks />

                                <span>
                                    Submit Task
                                </span>


                            </NavLink>






                            {/* History */}

                            <NavLink
                                to="/history"
                                className={menuClass}
                            >

                                <FaHistory />

                                <span>
                                    History
                                </span>


                            </NavLink>



                        </>

                    )

                }






                {/* =========================
                    COMMON PROFILE
                ========================= */}



                <NavLink
                    to="/profile"
                    className={menuClass}
                >

                    <FaUser />

                    <span>
                        Profile
                    </span>


                </NavLink>



            </nav>



        </aside>


    );

}


export default Sidebar;