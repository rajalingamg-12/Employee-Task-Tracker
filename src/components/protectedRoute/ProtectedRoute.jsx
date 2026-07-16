import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({children,role}){

    const {user}=useAuth();

    // Not logged in

    if(!user){

        return <Navigate to="/login" replace />;

    }

    // Role validation

    if(role && user.role!==role){

        return (

            user.role==="Manager"

            ?

            <Navigate to="/admin" replace />

            :

            <Navigate to="/employee" replace />

        );

    }

    return children;

}

export default ProtectedRoute;