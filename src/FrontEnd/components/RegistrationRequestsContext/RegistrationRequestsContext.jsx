
import { useState,useContext, createContext,useEffect } from "react";
const RegistrationRequestsContext = createContext(null);
import { useNavigate } from "react-router";

const RegistrationRequestsProvider = ({ children }) => {

    const navigate=useNavigate();
    
    const [requests,setRequests]=useState([]);
    const [category,setCategory]=useState('pending')
    const [url,setUrl]=useState("http://localhost:3000/api/user/admin/pending-registration-requests")
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        const getRequests=()=>{
        fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(res=>{

            if (res.isAuthenticated === false){
                navigate("/auth/login");
            }
            else{
                setRequests(res.requests);
            }
            setLoading(false);
        })
        .catch((e)=>{ 
            alert("Error during fetching requests: " + e);
        })   
    }
            
            getRequests()
    },[category,url,navigate])

    

    return (
        <RegistrationRequestsContext.Provider value={{category,requests,loading,url,setCategory,setRequests,setLoading,setUrl}}>
            {children}
        </RegistrationRequestsContext.Provider>
    );

};

export default RegistrationRequestsProvider;

export const UseRegistrationRequests=()=> {
    return useContext(RegistrationRequestsContext);
}