import { useState,useContext, createContext, useEffect } from "react";
import {useNavigate} from "react-router";
import { API_URL, apiFetch, setUnauthorizedHandler } from "../../utils/apiClient";
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("UserData")) || null);
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("AuthStatus") || "false");
    const [subscription, setSubscription] = useState(localStorage.getItem("SubscriptionPlan")||"none");
    const navigate = useNavigate();
    const loginAction = async (data,redirectionURL) => {
        try {
            //raw fetch (not apiFetch) - a failed login isn't a "session lost" event and shouldn't trigger auto-logout
            const response = await fetch(API_URL+'/api/user/auth/login/submit-user-info', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            if (res.isAuthenticated===true) {
                const resPlan = await apiFetch('/api/user/auth/login/check-subscription');

                setSubscription(resPlan.plan);
                setUser(res.user);
                setIsAuthenticated(res.isAuthenticated.toString());
                localStorage.setItem("UserData", JSON.stringify(res.user));
                localStorage.setItem("AuthStatus", res.isAuthenticated.toString());
                localStorage.setItem("SubscriptionPlan",resPlan.plan);
                navigate(redirectionURL);
            }
            else if (res.isAuthenticated === false) {
                alert(res.message);
            }
        } catch (err) {
            console.error(err);
        }
    };
    const logOut = async() => {
        try{
            setUser(null);
            setIsAuthenticated("false");
            setSubscription("none");
            localStorage.removeItem("AuthStatus");
            localStorage.removeItem("UserData");
            localStorage.removeItem("SubscriptionPlan");

            const res = await apiFetch('/api/user/auth/logout', { method: "POST" });
            if(res.loggedOut){
                navigate("/auth");
            }
        }
        catch (err) {
            console.error(err);
        }
    };

    //keep apiFetch's auto-logout handler pointed at the current logOut closure
    useEffect(() => {
        setUnauthorizedHandler(logOut);
    });

    return (
        <AuthContext.Provider value={{user, isAuthenticated,subscription, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth=()=> {
    return useContext(AuthContext);
}

