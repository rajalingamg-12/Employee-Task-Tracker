import React, { useEffect, useState, useCallback } from "react";
import "./History.css";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Loader from "../../components/loader/Loader";

import {getMyTasks} from "../../services/taskServices";
import {useAuth} from "../../context/AuthContext";

function History(){

    const {user}=useAuth();

    const [tasks,setTasks]=useState([]);

    const [loading,setLoading]=useState(true);

const loadHistory = useCallback(async () => {

        if(!user?.email){

            setLoading(false);

            return;

        }

        try{

            setLoading(true);

            const response=await getMyTasks(user.email);

            if(response.success){

                setTasks(response.data);

            }else{

                setTasks([]);

            }

        }

        catch(error){

            console.log(error);

            setTasks([]);

        }

        finally{

            setLoading(false);

        }

    }, [user]);

   useEffect(() => {

    loadHistory();

}, [loadHistory]);

    return(

        <>

            <Navbar/>

            <Sidebar/>

            <main className="history-content">
<div className="employee-history-info">

    <div>
        <span>Employee Name</span>
        <h3>{user?.name || "Unknown"}</h3>
    </div>

    <div>
        <span>Email</span>
        <h3>{user?.email}</h3>
    </div>

    <div>
        <span>Total Tasks</span>
        <h3>{tasks.length}</h3>
    </div>

</div>

                {

                loading

                ?

                <Loader/>

                :

                <div className="history-table-box">

                    <table className="history-table">

                        <thead>

                            <tr>

                                <th>Date</th>

                                <th>Client</th>

                                <th>Project</th>

                                <th>Description</th>

                                <th>Priority</th>

                                <th>Status</th>

                                <th>Manager Remarks</th>

                                <th>Submitted Time</th>

                            </tr>

                        </thead>

                        <tbody>

                        {

                        tasks.length>0

                        ?

                        tasks.map((task,index)=>(

                            <tr key={index}>

                                <td>{task.date}</td>

                                <td>{task.client}</td>

                                <td>{task.project}</td>

                                <td className="history-description">

                                    {task.description}

                                </td>

                                <td>

                                    <span className={`priority ${(task.priority || "").toLowerCase()}`}>

                                        {task.priority}

                                    </span>

                                </td>

                                <td>

                                    <span className={`status ${(task.status || "").replace(" ","").toLowerCase()}`}>

                                        {task.status}

                                    </span>

                                </td>

                                <td>

                                    {task.remarks || "-"}

                                </td>

                                <td>

                                    {task.submittedTime}

                                </td>

                            </tr>

                        ))

                        :

                        <tr>

                            <td
                                colSpan="8"
                                className="empty-history"
                            >

                                No Tasks Submitted Yet

                            </td>

                        </tr>

                        }

                        </tbody>

                    </table>

                </div>

                }

            </main>

        </>

    );

}

export default History;