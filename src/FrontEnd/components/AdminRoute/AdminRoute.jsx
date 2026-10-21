import React from "react";
import { Navigate, Outlet } from "react-router";
import {useAuth} from "../AuthContext/AuthContext";
import { isAdmin } from "../../utils/roles";
const AdminRoute=()=>{
    const auth = useAuth();
    if (auth.isAuthenticated!=="true") return <Navigate to="/auth" />;
    if (!isAdmin(auth.user)) return <Navigate to="/unauthorized" />;
    return <Outlet />;
}

export default AdminRoute;