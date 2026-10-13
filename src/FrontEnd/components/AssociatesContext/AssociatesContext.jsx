import { useState,useContext, createContext } from "react";
import {useAuth} from "../AuthContext/AuthContext";
const AssociatesContext = createContext(null);

const AssociatesProvider = ({ children }) => {
    const auth=useAuth();
    const [users, setUsers]=useState({});
    const [associates, setAssociates]=useState({});
    const [modalOpen, setModalOpen] = useState(false);
    
    const handleModalClose = () => {
        setModalOpen(false);
    };
    const handleModalOpen = () => {
        setModalOpen(true);
    };
    

    const searchUsers=(businessName)=>{
        fetch('http://localhost:3000/api/user/search-user/business-name/'+businessName, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
            .then(response => response.json())
            .then(res => {
                if(res?.isAuthenticated===false){
                    auth.logOut();
                }
                else if(res.success===true){
                    setUsers(res.users)
                }
                else if(res.success==false){
                    console.log(res.message);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    const getAssociates=()=>{
        fetch('http://localhost:3000/api/user/get-associates/', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
            .then(response => response.json())
            .then(res => {
                if(res?.isAuthenticated===false){
                    auth.logOut();
                }
                else if(res.success===true){
                    setAssociates(res.users)
                }
                else if(res.success==false){
                    console.log(res.message);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <AssociatesContext.Provider value={{users,associates,modalOpen,handleModalOpen,handleModalClose,searchUsers,getAssociates}}>
            {children}
        </AssociatesContext.Provider>
    );

};

export default AssociatesProvider;

export const useAssociates=()=> {
    return useContext(AssociatesContext);
}