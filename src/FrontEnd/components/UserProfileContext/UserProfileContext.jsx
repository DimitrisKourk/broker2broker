import { useState,useEffect,useContext, createContext } from "react";
import {useAuth} from "../AuthContext/AuthContext";
import { useNavigate } from "react-router";
const UserProfileContext = createContext(null);

const UserProfileProvider = ({ children }) => {
    const navigate=useNavigate();
    const [user, setUser]=useState({});
    const [associationStatus,setAssociationStatus]=useState({});
    const auth=useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [properties,setProperties]=useState([])
    
    const handleModalClose = () => {
        setModalOpen(false);
    };
    const handleModalOpen = () => {
        setModalOpen(true);
    };

 
    const getUserData=(username,getProperties)=>{
        fetch('http://localhost:3000/api/user/get-user/'+username, {
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
        fetch('http://localhost:3000/api/property/get-user-profile-properties/'+userId, {
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
        fetch('http://localhost:3000/api/user/association-status/'+user.user_id, {
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
                else{
                    setAssociationStatus(res.associationStatus);
                    console.log(res.associationStatus);
                }
                
            })
            .catch(e => {
                console.log(e)
            })
    }

    const sendAssociationRequest=()=>{
        fetch('http://localhost:3000/api/user/association-request/create/'+user.user_id, {
                method: "POST",
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
        fetch('http://localhost:3000/api/user/association-request/cancel/'+associationStatus.requestId, {
                method: "PUT",
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
        fetch('http://localhost:3000/api/user/association-request/decline/'+associationStatus.requestId, {
                method: "PUT",
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
        fetch('http://localhost:3000/api/user/association-request/accept/'+associationStatus.requestId+"/from/"+user.user_id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
            .then(response => response.json())
            .then(res => {
                console.log(toString(res));
                if(res?.isAuthenticated===false){
                    auth.logOut();
                }
                else if(res.success===true){
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
        fetch('http://localhost:3000/api/user/association/delete/'+user.user_id, {
                method: "DELETE",
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
        fetch('http://localhost:3000/api/user/profile/upload-profile-picture', {
                method: "POST",
                credentials: "include",
                body: formData,
            })
            .then(response => response.json())
            .then(res => {
                 if(res?.isAuthenticated===false){
                    auth.logOut();
                }
                else if(res.success===true){
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