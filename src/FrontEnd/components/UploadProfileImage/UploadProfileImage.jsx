import UploadImagePreviewContainer from '../UploadImagePreviewContainer/UploadImagePreviewContainer'
import { useState,useRef } from 'react';
import { useProfile } from '../UserProfileContext/UserProfileContext';
import './UploadProfileImage.css'
function UploadProfileImage() {
    const [profilePicture,setProfilePicture]=useState([])
    const fileInputRef = useRef(null);
    const context=useProfile();
      const handleImageUploadClick = () => {
        fileInputRef.current?.click();
      };
    
      const updateImage = (e) => {
    
        if (e.target.files && e.target.files.length > 0) {
          setProfilePicture(Array.from(e.target.files));
        }
      };

      const removeImage=()=>{
        setProfilePicture([]);
      };
  return (
    <>
        <UploadImagePreviewContainer images={profilePicture} imageSize={"25%"} Ratio={1}/>
        <div className={"image-input-container"}>
            <button onClick={handleImageUploadClick}>New Profile Picture</button>
                <input
                ref={fileInputRef}
                type="file"
                accept={"image/*"}
                single={'true'}
                style={{ display: "none" }}
                onChange={updateImage}
                />
                {profilePicture.length===1&&<div className='finalize-upload'><button onClick={()=>{context.updateProfilePicture(profilePicture)}}>Upload</button> <button onClick={()=>{removeImage()}}>Cancel</button></div>}
        </div>
    </>
  )
}

export default UploadProfileImage