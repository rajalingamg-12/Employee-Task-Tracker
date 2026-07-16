import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaArrowLeft,
    FaTasks,
    FaCheckCircle,
    FaClock,
    FaSpinner,
    FaUsers,
    FaBuilding
} from "react-icons/fa";

import { getReports } from "../../services/taskServices";

import "./Reports.css";

const Reports = () => {

    const navigate = useNavigate();

    const [report, setReport] = useState({
        totalTasks: 0,
        completed: 0,
        pending: 0,
        inProgress: 0,
        employees: [],
        clients: []
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadReports();

    }, []);

    const loadReports = async () => {

        try {

            const res = await getReports();

            if (res.success) {

                setReport(res.data);

            }

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2 style={{ padding: "30px" }}>Loading Reports...</h2>;

    }

    return (

        <div className="reports-page">

            <div className="reports-header">

                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft />
                    Back
                </button>

                <div>

                    <h1>Task Reports</h1>

                    <p>
                        Monitor employee productivity and task performance
                    </p>

                </div>

            </div>

            <div className="reports-cards">

                <div className="report-card">

                    <div className="report-icon">

                        <FaTasks />

                    </div>

                    <div>

                        <h4>Total Tasks</h4>

                        <h2>{report.totalTasks}</h2>

                    </div>

                </div>

                <div className="report-card">

                    <div className="report-icon completed">

                        <FaCheckCircle />

                    </div>

                    <div>

                        <h4>Completed</h4>

                        <h2>{report.completed}</h2>

                    </div>

                </div>

                <div className="report-card">

                    <div className="report-icon pending">

                        <FaClock />

                    </div>

                    <div>

                        <h4>Pending</h4>

                        <h2>{report.pending}</h2>

                    </div>

                </div>

                <div className="report-card">

                    <div className="report-icon progress">

                        <FaSpinner />

                    </div>

                    <div>

                        <h4>In Progress</h4>

                        <h2>{report.inProgress}</h2>

                    </div>

                </div>

            </div>

            <div className="report-section">

                <div className="section-titles">

                    <FaUsers />

                    <h2>Employee Performance</h2>

                </div>

                <table>

                    <thead>

                        <tr>

                            <th>Employee</th>

                            <th>Total Tasks</th>

                            <th>Completed</th>

                            <th>Pending</th>

                        </tr>

                    </thead>

                    <tbody>

                        {report.employees.length === 0 ? (

                            <tr>

                                <td colSpan="4" align="center">

                                    No Data

                                </td>

                            </tr>

                        ) : (

                            report.employees.map((emp, index) => (

                                <tr key={index}>

                                    <td>{emp.employee}</td>

                                    <td>{emp.total}</td>

                                    <td>{emp.completed}</td>

                                    <td>{emp.pending}</td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

            <div className="report-section">

                <div className="section-titles">

                    <FaBuilding />

                    <h2>Client Summary</h2>

                </div>

                <table>

                    <thead>

                        <tr>

                            <th>Client</th>

                            <th>Total Tasks</th>

                            <th>Completed</th>

                        </tr>

                    </thead>

                    <tbody>

                        {report.clients.length === 0 ? (

                            <tr>

                                <td colSpan="3" align="center">

                                    No Data

                                </td>

                            </tr>

                        ) : (

                            report.clients.map((client, index) => (

                                <tr key={index}>

                                    <td>{client.client}</td>

                                    <td>{client.total}</td>

                                    <td>{client.completed}</td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default Reports;