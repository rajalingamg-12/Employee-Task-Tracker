// import React, { useState } from "react";
// import "./Login.css";

// import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// import { loginUser } from "../../services/taskServices";
// import { useAuth } from "../../context/AuthContext";

// function Login() {

//     const navigate = useNavigate();
//     const { login } = useAuth();

//     const [form, setForm] = useState({
//         email: "",
//         password: ""
//     });

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const handleChange = (e) => {

//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         });

//     };

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         setLoading(true);
//         setError("");

//         try {

//             const response = await loginUser(
//                 form.email,
//                 form.password
//             );

//             console.log("LOGIN RESPONSE :", response);
//             if (response.success) {

//                 login(response.data);

//                 navigate("/dashboard");

//             } else {

//                 setError(response.message);

//             }

//         } catch (err) {

//             console.log("========== LOGIN ERROR ==========");
//             console.log("FULL ERROR :", err);
//             console.log("CODE :", err.code);
//             console.log("MESSAGE :", err.message);
//             console.log("RESPONSE :", err.response);
//             console.log("REQUEST :", err.request);
//             console.log("CONFIG :", err.config);
//             console.log("=================================");

//             if (err.response) {

//                 setError(
//                     err.response.data?.message || "Server Error"
//                 );

//             } else if (err.request) {

//                 setError("Network Error");

//             } else {

//                 setError(err.message);

//             }

//         } finally {

//             setLoading(false);

//         }

//     };

//     return (

//         <div className="login-page">

//             <div className="login-card">

//                 <div className="login-header">

//                     <h1>Task Tracker</h1>

//                     <p>Employee Management System</p>

//                 </div>

//                 <form onSubmit={handleSubmit}>

//                     <div className="input-box">

//                         <FaEnvelope />

//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Enter Email"
//                             value={form.email}
//                             onChange={handleChange}
//                             required
//                         />

//                     </div>

//                     <div className="input-box">

//                         <FaLock />

//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Enter Password"
//                             value={form.password}
//                             onChange={handleChange}
//                             required
//                         />

//                     </div>

//                     {error && (
//                         <div className="login-error">
//                             {error}
//                         </div>
//                     )}

//                     <button
//                         type="submit"
//                         className="login-btn"
//                         disabled={loading}
//                     >

//                         <FaSignInAlt />

//                         {loading ? "Logging in..." : "Login"}

//                     </button>

//                 </form>

//             </div>

//         </div>

//     );

// }

// export default Login;
import React, { useState } from "react";
import "./Login.css";

import {
    FaEnvelope,
    FaLock,
    FaSignInAlt,
    FaCheckCircle,
    FaLaptopCode,
    FaUsers,
    FaTasks
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/taskServices";
import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/T-logo.png";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({

        email: "",

        password: ""

    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        setSuccess("");

        try {

            const response = await loginUser(

                form.email,

                form.password

            );

            console.log("LOGIN RESPONSE :", response);

            if (response.success) {

                login(response.data);

                setSuccess(

                    `Welcome ${response.data.name}! Login Successful.`

                );

                setTimeout(() => {

                    navigate("/dashboard");

                }, 1500);

            }

            else {

                setError(

                    response.message || "Invalid Email or Password"

                );

            }

        }

        catch (err) {

            console.log(err);

            if (err.response) {

                setError(

                    err.response.data?.message || "Server Error"

                );

            }

            else if (err.request) {

                setError("Network Error");

            }

            else {

                setError(err.message);

            }

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            <div className="login-container">

                {/* LEFT PANEL */}

                <div className="login-left">

                    <div className="company-box">

                        <img

                            src={logo}

                            alt="Techie Crew"

                            className="company-logo1"

                        />

                        <h1>

                            Techie Crew

                        </h1>

                        <h2>

                            Employee Task Tracker

                        </h2>

                        <p>

                            Smart Employee Task Management System

                        </p>

                    </div>

                    <div className="feature-list">

                        <div className="feature-item">

                            <FaTasks />

                            <span>

                                Daily Task Submission Form

                            </span>

                        </div>

                        <div className="feature-item">

                            <FaUsers />

                            <span>

                                Employee Management

                            </span>

                        </div>

                        <div className="feature-item">

                            <FaLaptopCode />

                            <span>

                                Monitoring Tasks Sheet & Reports

                            </span>

                        </div>

                    </div>

                </div>

                {/* RIGHT PANEL */}

                <div className="login-right">

                    <div className="login-card">

                        <div className="login-header">

                            <h2>

                                Welcome Back

                            </h2>

                            <p>

                                Login to continue

                            </p>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="input-box">

                                <FaEnvelope />

                                <input

                                    type="email"

                                    name="email"

                                    placeholder="Email Address"

                                    value={form.email}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="input-box">

                                <FaLock />

                                <input

                                    type="password"

                                    name="password"

                                    placeholder="Password"

                                    value={form.password}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            {

                                error &&

                                <div className="login-error">

                                    {error}

                                </div>

                            }

                            {

                                success &&

                                <div className="login-success">

                                    <FaCheckCircle />

                                    <span>

                                        {success}

                                    </span>

                                </div>

                            }

                            <button

                                type="submit"

                                className="login-btn"

                                disabled={loading}

                            >

                                <FaSignInAlt />

                                {

                                    loading

                                        ?

                                        "Logging in..."

                                        :

                                        "Login"

                                }

                            </button>

                        </form>

                        <div className="login-footer">

                            © 2026 Techie Crew

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;