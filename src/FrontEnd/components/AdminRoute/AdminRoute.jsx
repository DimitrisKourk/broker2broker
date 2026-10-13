import React from "react";
import { Navigate, Outlet } from "react-router";
import {useAuth} from "../AuthContext/AuthContext";
const AdminRoute=()=>{
    const auth = useAuth();
    if (auth.isAuthenticated==="true" && (auth.user.role===10 || auth.user.role===69)) return <Outlet />;
    if (auth.isAuthenticated==="true" && (auth.user.role!==10 || auth.user.role!==69)) return <Navigate to="/unauthorized" />;
    return <Navigate to="/auth" />;

}

export default AdminRoute;