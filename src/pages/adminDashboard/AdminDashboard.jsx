import React, { useEffect, useState } from "react";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

import DashboardCard from "../../components/dashboardCard/DashboardCard";
import TaskTable from "../../components/taskTable/TaskTable";
import Loader from "../../components/loader/Loader";

import { useAuth } from "../../context/AuthContext";

import {
    FaUsers,
    FaTasks,
    FaCheckCircle,
    FaClock,
    FaSpinner,
    FaSyncAlt,
    FaUser
} from "react-icons/fa";
import {getDashboard,getAllTasks} from "../../services/taskServices";


import "./AdminDashboard.css";


const AdminDashboard = () => {

    const { user } = useAuth();
    const [dashboard,setDashboard] = useState({

        totalEmployees:0,
        todayTasks:0,
        completed:0,
        pending:0,
        inProgress:0

    });

    const [tasks,setTasks] = useState([]);

    const [loading,setLoading] = useState(true);
    const loadData = async()=>{

        try{

            setLoading(true);
            const dashboardResponse = await getDashboard();
            const taskResponse = await getAllTasks();
            console.log(
                "Dashboard Response:",
                dashboardResponse
            );
            console.log(
                "Task Response:",
                taskResponse
            );
            if(dashboardResponse.success){
                setDashboard(
                    dashboardResponse.data
                );

            }
            if(taskResponse.success){


                setTasks(
                    taskResponse.data || []
                );

            }
        }

        catch(error){

            console.log(
                "Admin Dashboard Error:",
                error
            );
        }

        finally{

            setLoading(false);
        }
    };
    useEffect(()=>{
        loadData();
    },[]);
    return(


        <div className="admin-dashboard-page">


            <Navbar/>


            <Sidebar/>




            <main className="admin-dashboard-content">



                <div className="admin-dashboard-header">


                    <div>


                        <h1 className="admin-dashboard-title">

                            Admin Dashboard

                        </h1>



                        <p className="admin-dashboard-subtitle">

                            Monitor employee daily task reports.

                        </p>
                    </div>
                    <button
                    className="admin-dashboard-refresh"
                    onClick={loadData}>
                        <FaSyncAlt/>
                        Refresh
                    </button>
                </div>
                <div className="admin-profile-box">
                    <FaUser className="admin-profile-icon"/>

                    <div className="admin-profile-info">


                        <h3>

                            {user?.name}

                        </h3>



                        <p>

                            Role : {user?.role}

                        </p>



                        <p>

                            Email : {user?.email}

                        </p>


                    </div>



                </div>







                {


                loading ?


                <Loader/>


                :


                <>





                <div className="admin-dashboard-cards">





                    <DashboardCard

                    title="Employees"

                    value={dashboard.totalEmployees}

                    icon={<FaUsers/>}

                    />





                    <DashboardCard

                    title="Today's Tasks"

                    value={dashboard.todayTasks}

                    icon={<FaTasks/>}

                    />





                    <DashboardCard

                    title="Completed"

                    value={dashboard.completed}

                    icon={<FaCheckCircle/>}

                    />





                    <DashboardCard

                    title="Pending"

                    value={dashboard.pending}
                    icon={<FaClock/>}/>

                    <DashboardCard
                    title="In Progress"
                    value={dashboard.inProgress}
                    icon={<FaSpinner/>}
                    />
                </div>
                <section className="admin-task-box">
                    <div className="admin-task-header">
                        <h2>
                            Employee Task List
                        </h2>
                    </div>
                    <TaskTable
                    tasks={tasks}
                    refresh={loadData}/>
                </section>
                </>
                }
            </main>
        </div>
    );
};

export default AdminDashboard;