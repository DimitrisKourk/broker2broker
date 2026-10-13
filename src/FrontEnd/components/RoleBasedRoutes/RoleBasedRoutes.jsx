import { Navigate, Outlet } from "react-router";
import {useAuth} from "../AuthContext/AuthContext";

function ApprovalPending() {
    const auth = useAuth();
    if (auth.isAuthenticated==="false") return <Navigate to="/auth" />;   
    if (auth.isAuthenticated==="true" && auth.user.role===0) return <Outlet />;;
    return <Navigate to="/home" />;
}
const NoActivePlan=()=>{
    const auth = useAuth();
    if (auth.isAuthenticated==="false") return <Navigate to="/auth" />;   
    if (auth.isAuthenticated==="true" && auth.user.role===-1) return <Outlet />;
    return <Navigate to="/home" />;
}

const Restricted=()=>{
    const auth = useAuth();
    if (auth.isAuthenticated==="false") return <Navigate to="/auth" />;   
    if (auth.isAuthenticated==="true" && auth.user.role===-2) return <Outlet />;
    return <Navigate to="/home" />;
}

const RegistrationRequestDeclined=()=>{
    const auth = useAuth();
    if (auth.isAuthenticated==="false") return <Navigate to="/auth" />;   
    if (auth.isAuthenticated==="true" && auth.user.role===-3) return <Outlet />;
    return <Navigate to="/home" />;
}


export  {ApprovalPending,NoActivePlan,Restricted,RegistrationRequestDeclined }