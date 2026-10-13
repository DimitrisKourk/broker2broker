import { Navigate, Outlet } from "react-router";
import {useAuth} from "../AuthContext/AuthContext";
const PrivateRoute=()=>{
    const auth = useAuth();
    if (auth.isAuthenticated==="false") return <Navigate to="/auth" />;
    if (auth.isAuthenticated==="true" && auth.user.role===-3 ) return <Navigate to="/registration-declined" />;   
    if (auth.isAuthenticated==="true" && auth.user.role===-2 ) return <Navigate to="/restriced" />;       
    if (auth.isAuthenticated==="true" && auth.user.role===-1) return <Navigate to="/no-active-plan" />;  
    
    if (auth.isAuthenticated==="true" && auth.user.role===0) return <Navigate to="/approval-pending" />;    
    return <Outlet />;
}

export default PrivateRoute;
