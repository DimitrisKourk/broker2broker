import { useState,useEffect,useContext, createContext } from "react";
import { apiFetch } from "../../utils/apiClient";
import { useNavigate } from "react-router";
const UserProfileContext = createContext(null);

const UserProfileProvider = ({ children }) => {
    const navigate=useNavigate();
    const [user, setUser]=useState({});
    const [associationStatus,setAssociationStatus]=useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [properties,setProperties]=useState([])
    
    const handleModalClose = () => {
        setModalOpen(false);
    };
    const handleModalOpen = () => {
        setModalOpen(true);
    };

 
    const getUserData=(username,getProperties)=>{
        apiFetch('/api/user/get-user/'+username)
            .then(res => {
                if(res.success===true){
                    setUser(res.user);
                    if(getProperties){
                        console.log('Getting user properties...')
                        getUserProperties(res.user.user_id);
                    }

                }
                else if(res.success==false){
                    console.log(res.message);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
   const getUserProperties=(userId)=>{
        apiFetch('/api/property/get-user-profile-properties/'+userId)
            .then(res => {
                if(res.success===true){
                    console.log(res.properties)
                    setProperties(res.properties);
                }
                else if(res.success===false){
                    console.log(res.message);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    const getAssociationStatus=()=>{
        apiFetch('/api/user/association-status/'+user.user_id)
            .then(res => {
                if(res.isAuthenticated!==false){
                    setAssociationStatus(res.associationStatus);
                    console.log(res.associationStatus);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    const sendAssociationRequest=()=>{
        apiFetch('/api/user/association-request/create/'+user.user_id, { method: "POST" })
            .then(res => {
                if(res.success===true){
                    getAssociationStatus();
                }
                else if(res.success==false){
                    console.log(res.message);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
    const cancelAssociationRequest=()=>{
        apiFetch('/api/user/association-request/cancel/'+associationStatus.requestId, { method: "PUT" })
            .then(res => {
                if(res.success===true){
                    getAssociationStatus();
                }
                else if(res.success==false){
                    console.log(res.message);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
     const declineAssociationRequest=()=>{
        apiFetch('/api/user/association-request/decline/'+associationStatus.requestId, { method: "PUT" })
            .then(res => {
                if(res.success===true){
                    getAssociationStatus();
                }
                else if(res.success==false){
                    console.log(res.message);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    const acceptAssociationRequest=()=>{
        apiFetch('/api/user/association-request/accept/'+associationStatus.requestId+"/from/"+user.user_id, { method: "PUT" })
            .then(res => {
                console.log(toString(res));
                if(res.success===true){
                    getAssociationStatus();
                }
                else if(res.success==false){
                    console.log(res.message);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
    const deleteAssociation=()=>{
        apiFetch('/api/user/association/delete/'+user.user_id, { method: "DELETE" })
            .then(res => {
                if(res.success===true){
                    getAssociationStatus();
                }
                else if(res.success==false){
                    console.log(res.message);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    const updateUserData=()=>{

    }
    const updateProfilePicture=(profilePicture)=>{
        const formData=new FormData();
        formData.append('file',profilePicture[0]);
        console.log(formData);
        apiFetch('/api/user/profile/upload-profile-picture', { method: "POST", body: formData })
            .then(res => {
                if(res.success===true){
                    navigate(0)
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
        <UserProfileContext.Provider value={{user,associationStatus,getUserData,getAssociationStatus,sendAssociationRequest,cancelAssociationRequest,declineAssociationRequest,acceptAssociationRequest,deleteAssociation,modalOpen,handleModalClose,handleModalOpen,updateUserData,updateProfilePicture,properties}}>
            {children}
        </UserProfileContext.Provider>
    );

};

export default UserProfileProvider;

export const useProfile=()=> {
    return useContext(UserProfileContext);
}