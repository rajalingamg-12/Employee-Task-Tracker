import React, { useEffect, useState } from "react";

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Loader from "../../components/loader/Loader";

import { FaUsers, FaSyncAlt } from "react-icons/fa";

import { getEmployees } from "../../services/taskServices";

import "./Employees.css";

const Employees = () => {

    const [employees, setEmployees] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadEmployees = async () => {

        try {

            setLoading(true);

            const response = await getEmployees();

            console.log("Employees :", response);

            if (response.success) {

                setEmployees(response.data || []);

            }

        }

        catch (error) {

            console.log("Employee Loading Error :", error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadEmployees();

    }, []);

    return (

        <div className="employees-page">

            <Navbar />

            <div className="employees-layout">

                <Sidebar />

                <main className="employees-content">

                    <div className="employees-header">

                        <div>

                            <h1>

                                <FaUsers />

                                Employees

                            </h1>

                            <p>

                                View all registered employees.

                            </p>

                        </div>

                        <button
                            className="employees-refresh-btn"
                            onClick={loadEmployees}
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

                            <div className="employees-table-card">

                                <table className="employees-table">

                                    <thead>

                                        <tr>

                                            <th>Name</th>

                                            <th>Email</th>

                                            <th>Role</th>

                                            <th>Designation</th>

                                            <th>Mobile</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            employees.length > 0

                                                ?

                                                employees.map((employee, index) => (

                                                    <tr key={index}>

                                                        <td>

                                                            {employee.name}

                                                        </td>

                                                        <td>

                                                            {employee.email}

                                                        </td>

                                                        <td>

                                                            {employee.role}

                                                        </td>

                                                        <td>

                                                            {employee.designation}

                                                        </td>

                                                        <td>

                                                            {employee.mobile}

                                                        </td>

                                                    </tr>

                                                ))

                                                :

                                                <tr>

                                                    <td
                                                        colSpan="5"
                                                        style={{ textAlign: "center" }}
                                                    >

                                                        No Employees Found

                                                    </td>

                                                </tr>

                                        }

                                    </tbody>

                                </table>

                            </div>

                    }

                </main>

            </div>

        </div>

    );

};

export default Employees;