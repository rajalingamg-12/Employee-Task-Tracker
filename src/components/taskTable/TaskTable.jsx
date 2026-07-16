import React, { useEffect, useState } from "react";
import "./TaskTable.css";
import { updateRemarks } from "../../services/taskServices";

function TaskTable({ tasks = [], refresh }) {
    const [remarks, setRemarks] = useState({});
    const [savingRow, setSavingRow] = useState(null);

    useEffect(() => {
        const initialRemarks = {};

        tasks.forEach((task) => {
            initialRemarks[task.row] = task.remarks || "";
        });

        setRemarks(initialRemarks);
    }, [tasks]);

    const handleChange = (row, value) => {
        setRemarks((prev) => ({
            ...prev,
            [row]: value,
        }));
    };

    const saveRemarks = async (row) => {
        try {
            setSavingRow(row);

            const response = await updateRemarks(
                row,
                remarks[row] || ""
            );

            if (response.success) {
                alert("Remarks Updated Successfully");
                refresh();
            } else {
                alert(response.message || "Update failed.");
            }
        } catch (error) {
            console.error(error);
            alert("Unable to update remarks.");
        } finally {
            setSavingRow(null);
        }
    };

    return (
        <div className="table-container">
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Employee</th>
                        <th>Designation</th>
                        <th>Client</th>
                        <th>Project</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Remarks</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <tr key={task.row}>
                                <td>{task.date}</td>
                                <td>{task.employee}</td>
                                <td>{task.designation}</td>
                                <td>{task.client}</td>
                                <td>{task.project}</td>

                                <td className="description">
                                    {task.description}
                                </td>

                                <td>
                                    <span
                                        className={`priority ${(task.priority || "").toLowerCase()}`}
                                    >
                                        {task.priority}
                                    </span>
                                </td>

                                <td>
                                    <span
                                        className={`status ${(task.status || "")
                                            .replace(/\s+/g, "")
                                            .toLowerCase()}`}
                                    >
                                        {task.status}
                                    </span>
                                </td>

                                <td>
                                    <input
                                        type="text"
                                        value={remarks[task.row] || ""}
                                        onChange={(e) =>
                                            handleChange(task.row, e.target.value)
                                        }
                                        placeholder="Admin Remarks"
                                    />
                                </td>

                                <td>
                                    <button
                                        className="save-btn"
                                        disabled={savingRow === task.row}
                                        onClick={() => saveRemarks(task.row)}
                                    >
                                        {savingRow === task.row
                                            ? "Saving..."
                                            : "Save"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="empty">
                                No Tasks Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TaskTable;