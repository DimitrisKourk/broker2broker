import {UsePropertyStepForm} from "../../PropertyStepFormContext/PropertyStepFormContext";
import CustomImageFileInput from '../../CustomImageFileInput/CustomImageFileInput';
import UploadImagePreviewContainer from '../../UploadImagePreviewContainer/UploadImagePreviewContainer';

const PropertyStepFormStep7 = () => {
    const context=UsePropertyStepForm();

  return (
    <div className='PropertyStepFormStep7'>
        <UploadImagePreviewContainer images={context.imageFiles}/>
        <CustomImageFileInput />
    </div>
  )
}

export default PropertyStepFormStep7