import { useState,useContext, createContext } from "react";
import { apiFetch } from "../../utils/apiClient";
const AssociatesContext = createContext(null);

const AssociatesProvider = ({ children }) => {
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
        apiFetch('/api/user/search-user/business-name/'+businessName)
            .then(res => {
                if(res.success===true){
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
        apiFetch('/api/user/get-associates/')
            .then(res => {
                if(res.success===true){
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