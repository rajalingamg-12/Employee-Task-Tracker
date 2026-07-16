import React from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/login/Login";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import EmployeeDashboard from "./pages/employeeDashboard/EmployeeDashboard";
import TaskForm from "./pages/taskForm/TaskForm";
import History from "./pages/history/History";
import NotFound from "./pages/notFound/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./components/profile/Profile";
import AdminTasks from "./components/adminTask/AdminTask";
import Employees from "./components/employees/Employees";
import Reports from "./components/reports/Reports";

import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
// import AdminRoute from "./routes/AdminRoute";


function App() {

    return (

        <AuthProvider>

            <BrowserRouter>

                <Routes>


                    {/* Default Route */}

                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />


                    {/* Login */}

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin Dashboard */}

                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />


                    {/* Employee Dashboard */}

                    <Route
                        path="/employee"
                        element={
                            <ProtectedRoute>
                                <EmployeeDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
    path="/admin/reports"
    element={
        <ProtectedRoute>
            <Reports />
        </ProtectedRoute>
    }
/>

                    {/* Submit Task */}

                    <Route
                        path="/task"
                        element={
                            <ProtectedRoute>
                                <TaskForm />
                            </ProtectedRoute>
                        }
                    />


                    {/* History */}

                    <Route
                        path="/history"
                        element={
                            <ProtectedRoute>
                                <History />
                            </ProtectedRoute>
                        }
                    />
                    {/* Profile */}

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/tasks"
                        element={
                            <ProtectedRoute>
                                <AdminTasks />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/employees"
                        element={
                            <ProtectedRoute>
                                <Employees />
                            </ProtectedRoute>
                        }
                    />

                    {/* 404 */}

                    <Route
                        path="*"
                        element={<NotFound />}
                    />


                </Routes>

            </BrowserRouter>

        </AuthProvider>

    );

}


export default App;