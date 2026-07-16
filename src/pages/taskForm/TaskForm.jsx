import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

import { submitTask } from "../../services/taskServices";
import { useNavigate } from "react-router-dom";

import "./TaskForm.css";


const TaskForm = () => {


    const { user } = useAuth();

const navigate = useNavigate();

    const [task,setTask] = useState({

    client:"",
    project:"",
    description:"",
    priority:"Medium",
    status:"Pending"

});





    const handleChange = (e)=>{


        setTask({

            ...task,

            [e.target.name]:e.target.value

        });


    };







    const handleSubmit = async(e)=>{


        e.preventDefault();



        try{


           const response = await submitTask({

    email:user.email,

    client:task.client,

    project:task.project,

    description:task.description,

    priority:task.priority,

    status:task.status

});



            console.log(response);



alert("Task Submitted Successfully");

navigate("/employee");


            setTask({

    client:"",
    project:"",
    description:"",
    priority:"Medium",
    status:"Pending"

});



        }
        catch(error){


            console.log(error);


            alert("Task Submission Failed");


        }



    };







    return (


        <div className="task-page">


            <Navbar />


            <div className="task-container">


                <Sidebar />



                <main className="task-content">



                    <h1>
                        Submit Today's Task
                    </h1>




                    <form

                    className="task-form"

                    onSubmit={handleSubmit}

                    >




                        <label>
                            Client
                        </label>


                        <input

                        type="text"

                        name="client"

                        value={task.client}

                        onChange={handleChange}

                        placeholder="Enter client name"

                        required

                        />






                        <label>
                            Project
                        </label>


                        <input

                        type="text"

                        name="project"

                        value={task.project}

                        onChange={handleChange}

                        placeholder="Enter project name"

                        required

                        />







                        {/* <label>
                            Task Title
                        </label>


                        <input

                        type="text"

                        name="title"

                        value={task.title}

                        onChange={handleChange}

                        placeholder="Enter task title"

                        required

                        /> */}







                        <label>
                            Description
                        </label>


                        <textarea

                        name="description"

                        value={task.description}

                        onChange={handleChange}

                        placeholder="Explain your work"

                        required

                        />







                        <label>
                            Priority
                        </label>


                        <select

                        name="priority"

                        value={task.priority}

                        onChange={handleChange}

                        >


                            <option>
                                Low
                            </option>


                            <option>
                                Medium
                            </option>


                            <option>
                                High
                            </option>


                        </select>









                        <label>
                            Status
                        </label>


                        <select

                        name="status"

                        value={task.status}

                        onChange={handleChange}

                        >


                            <option>
                                Pending
                            </option>


                            <option>
                                In Progress
                            </option>


                            <option>
                                Completed
                            </option>


                            <option>
                                On Hold
                            </option>


                        </select>







{/* 

                        <label>
                            Remarks
                        </label>


                        <textarea

                        name="remarks"

                        value={task.remarks}

                        onChange={handleChange}

                        placeholder="Enter remarks"

                        /> */}







                        <button type="submit">

                            Submit Task

                        </button>






                    </form>




                </main>



            </div>



        </div>



    );


};


export default TaskForm;