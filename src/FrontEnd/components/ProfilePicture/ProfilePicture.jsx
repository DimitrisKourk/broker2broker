import { useState,useEffect } from "react";
import { apiFetch } from "../../utils/apiClient";
function ProfilePicture({userId}) {
    const [profileImage,setProfileImage]=useState(null);
    const [loading,setLoading]=useState(true);
    const profileImageAPI=import.meta.env.VITE_PROFILE_IMAGE_API_URL;

    useEffect(()=>{
        apiFetch('/api/user/get-profile-picture/'+userId)
        .then(res => {
            if(res.success===true){
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