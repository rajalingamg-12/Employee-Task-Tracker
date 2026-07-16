import React, { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

import DashboardCard from "../../components/dashboardCard/DashboardCard";

import {
    FaTasks,
    FaCheckCircle,
    FaClock,
    FaUser
} from "react-icons/fa";

import {
    getMyTasks
} from "../../services/taskServices";

import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {

    const { user } = useAuth();

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const [taskCount, setTaskCount] = useState({

        total: 0,

        completed: 0,

        pending: 0

    });

    const loadTasks = async () => {

        try {

            const response = await getMyTasks(user.email);

            console.log(
                "Employee Tasks:",
                response
            );

            if (response.success) {

                const taskData = response.data || [];

                console.log(
                    "Task Status Values:",
                    taskData.map(
                        task => task.status
                    )
                );

                setTasks(taskData);

                setTaskCount({

                    total: taskData.length,

                    completed:

                        taskData.filter(

                            task =>

                                (task.status || "")

                                    .toLowerCase()

                                === "completed"

                        ).length,

                    pending:

                        taskData.filter(

                            task =>

                                (task.status || "")

                                    .toLowerCase()

                                === "pending"

                        ).length

                });

            }

        }

        catch (error) {

            console.log(
                "Task Loading Error:",
                error
            );

        }

    };

    useEffect(() => {

        if (user?.email) {

            loadTasks();

        }

    }, [user]);
        return (

        <div className="employee-home-page">

            <Navbar />

            <div className="employee-home-container">

                <Sidebar />

                <section className="employee-home-content">

                    {/* Welcome Section */}

                    <div className="employee-welcome-section">

                        <h1>
                            Welcome {user?.name}
                        </h1>

                        <p>
                            {user?.designation}
                        </p>

                    </div>

                    {/* Dashboard Cards */}

                    <div className="employee-dashboard-cards">

                        <DashboardCard
                            title="Total Tasks"
                            count={taskCount.total}
                            icon={<FaTasks />}
                        />

                        <DashboardCard
                            title="Completed"
                            count={taskCount.completed}
                            icon={<FaCheckCircle />}
                        />

                        <DashboardCard
                            title="Pending"
                            count={taskCount.pending}
                            icon={<FaClock />}
                        />

                    </div>

                    {/* Recent Tasks */}

                    <section className="employee-recent-task-section">

                        <h2>
                            Recent Tasks
                        </h2>

                        <div className="employee-table-wrapper">

                            <table className="employee-task-table">

                                <thead>

                                    <tr>

                                        <th>Date</th>

                                        <th>Client</th>

                                        <th>Project</th>

                                        <th>Description</th>

                                        <th>Status</th>

                                        <th>Remarks</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        tasks.length > 0

                                            ?

                                            tasks.map((task, index) => (

                                                <tr key={index}>

                                                    <td>
                                                        {task.date}
                                                    </td>

                                                    <td>
                                                        {task.client}
                                                    </td>

                                                    <td>
                                                        {task.project}
                                                    </td>

                                                    <td>
                                                        {task.description}
                                                    </td>

                                                    <td>

                                                        <span

                                                            className={`employee-task-status ${(task.status || "")
                                                                .replace(/\s+/g, "")
                                                                .toLowerCase()
                                                            }`}

                                                        >

                                                            {task.status}

                                                        </span>

                                                    </td>

                                                    <td>

                                                        {task.remarks || "-"}

                                                    </td>

                                                </tr>

                                            ))

                                            :

                                            <tr>

                                                <td colSpan="6">

                                                    No Tasks Found

                                                </td>

                                            </tr>

                                    }

                                </tbody>

                            </table>

                        </div>

                    </section>

                    {/* Profile Section */}

                    <div className="employee-profile-card">

                        <h2>

                            My Profile

                        </h2>

                        <div className="employee-profile-details">

                            <div>

                                <FaUser />

                                <span>

                                    {user?.name}

                                </span>

                            </div>

                            <div>

                                Email : {user?.email}

                            </div>

                            <div>

                                Role : {user?.role}

                            </div>

                            <div>

                                Designation : {user?.designation}

                            </div>

                            <div>

                                Mobile : {user?.mobile}

                            </div>

                        </div>

                    </div>

                    {/* Submit Button */}

                    <button

                        className="employee-submit-btn"

                        onClick={() => navigate("/task")}

                    >

                        Submit Today's Task

                    </button>

                </section>

            </div>

        </div>

    );

};

export default EmployeeDashboard;