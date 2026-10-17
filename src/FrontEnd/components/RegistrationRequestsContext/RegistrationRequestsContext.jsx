
import { useState,useContext, createContext,useEffect } from "react";
import { apiFetch } from "../../utils/apiClient";
const RegistrationRequestsContext = createContext(null);

const RegistrationRequestsProvider = ({ children }) => {

    const [requests,setRequests]=useState([]);
    const [category,setCategory]=useState('pending')
    const [url,setUrl]=useState("/api/user/admin/pending-registration-requests")
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        setLoading(true);
        apiFetch(url)
        .then(res=>{
            if (res.isAuthenticated !== false){
                setRequests(res.requests);
            }
            setLoading(false);
        })
        .catch((e)=>{
            alert("Error during fetching requests: " + e);
            setLoading(false);
        })
    },[category,url])

    

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