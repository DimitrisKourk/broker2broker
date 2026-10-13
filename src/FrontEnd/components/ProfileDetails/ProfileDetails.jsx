import { useProfile } from "../UserProfileContext/UserProfileContext"
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import TextInputComponent from "../TextInputComponent/TextInputComponent";
import { useState } from "react";
import UploadProfileImage from "../UploadProfileImage/UploadProfileImage";
import './ProfileDetails.css'
import { useAuth } from "../AuthContext/AuthContext";
function ProfileDetails() {
  const context=useProfile();
  const auth=useAuth();
  const [user,setUser]=useState(context.user)  
  
  const handleNameChange=(event)=>{
        setUser({...user,name:event.target.value});
    }
  return (
    <div className="profile-settings-details">
        <div className="profile-picture-settings">
            <ProfilePicture userId={auth.user.user_id}/>
            <UploadProfileImage/>
        </div>
        <TextInputComponent mode={"text"} label={"Name"} inputId={'name'} value={user?.name} handler={()=>handleNameChange}/>
    </div>
  )
}

export default ProfileDetails