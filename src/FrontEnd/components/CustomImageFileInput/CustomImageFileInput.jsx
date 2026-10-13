import {useRef } from 'react';
import { UsePropertyStepForm } from '../PropertyStepFormContext/PropertyStepFormContext';


const CustomImageFileInput = ({ accept = "image/*"}) => {
  const context=UsePropertyStepForm();
  const fileInputRef = useRef(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const updateImage = (e) => {

    if (e.target.files && e.target.files.length > 0) {
      context.cacheImages(Array.from(e.target.files));
    }
  };


  return (
    <div className={"image-input-container"}>
      <button onClick={handleImageUploadClick}>Upload Images</button>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          style={{ display: "none" }}
          onChange={updateImage}
        />
      </div>
  );
}

export default CustomImageFileInput;