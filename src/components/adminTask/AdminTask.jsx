import React, { useEffect, useState } from "react";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Loader from "../../components/loader/Loader";
import TaskTable from "../../components/taskTable/TaskTable";

import { FaTasks, FaSyncAlt } from "react-icons/fa";

import { getAllTasks } from "../../services/taskServices";

import "./AdminTask.css";

const AdminTasks = () => {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadTasks = async () => {

        try {

            setLoading(true);

            const response = await getAllTasks();

            console.log("All Tasks :", response);

            if (response.success) {

                setTasks(response.data || []);

            }

        }

        catch (error) {

            console.log("Task Loading Error :", error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadTasks();

    }, []);

    return (

        <div className="admin-task-page">

            <Navbar />

            <div className="admin-task-layout">

                <Sidebar />

                <main className="admin-task-content">

                    <div className="admin-task-header">

                        <div>

                            <h1>

                                <FaTasks />

                                All Employee Tasks

                            </h1>

                            <p>

                                View and manage all submitted employee tasks.

                            </p>

                        </div>

                        <button
                            className="admin-task-refresh-btn"
                            onClick={loadTasks}
                        >

                            <FaSyncAlt />

                            Refresh

                        </button>

                    </div>

                    {

                        loading

                            ?

                            <Loader />

                            :

                            <div className="admin-task-table-cards">

                                <TaskTable
                                    tasks={tasks}
                                    refresh={loadTasks}
                                />

                            </div>

                    }

                </main>

            </div>

        </div>

    );

};

export default AdminTasks;