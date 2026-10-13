import { useState,useEffect } from "react";
import { useAuth } from "../AuthContext/AuthContext";
function ProfilePicture({userId}) {
    const auth=useAuth();
    const [profileImage,setProfileImage]=useState(null);
    const [loading,setLoading]=useState(true);
    const profileImageAPI=import.meta.env.VITE_PROFILE_IMAGE_API_URL;

    useEffect(()=>{
        fetch('http://localhost:3000/api/user/get-profile-picture/'+userId, {
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
                setProfileImage(res.profileImage);
                setLoading(false)
            }
            else if(res.success==false){
                console.log(res.message);
            }
        })
        .catch(e => {
            console.log(e)
        })
    },[])

  return (
    <>
    {loading? null :<img className="profile-picture" src={profileImageAPI+"/"+profileImage} alt="404" />}
    </>
  )
}

export default ProfilePicture