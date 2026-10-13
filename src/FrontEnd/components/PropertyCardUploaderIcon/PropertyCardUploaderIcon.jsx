import ProfilePicture from "../ProfilePicture/ProfilePicture"
import './PropertyCardUploaderIcon.css'
import { useNavigate } from "react-router"

function PropertyCardUploaderIcon({userId,username}) {
  const navigate=useNavigate();
  
  const handleClick=()=>{
    let profile="/profile/"+username;
    console.log(profile);
    navigate(profile);
  }
  return (
    <div className="property-uploader-icon" onClick={()=>{handleClick()}}>
        <ProfilePicture userId={userId}/>
    </div>
  )
}

export default PropertyCardUploaderIcon