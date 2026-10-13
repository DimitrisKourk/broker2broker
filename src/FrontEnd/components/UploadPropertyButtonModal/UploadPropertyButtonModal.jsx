import Modal from "../Modal/Modal"
import { UsePropertyStepForm} from "../PropertyStepFormContext/PropertyStepFormContext";
import PropertyStepForm from "../PropertyStepForm/PropertyStepForm";
import CloseWindowX from "../CloseWindowX/CloseWindow";
import './UploadPropertyButtonModal.css';
function UploadPropertyButtonModal(){
    const context=UsePropertyStepForm()

    const handleButtonClick = () => {
        context.handleModalOpen();
    };
    
  return (
    <div className="UploadButtonWrapper">
        <button className="UploadButton" onClick={handleButtonClick}>Upload Property</button>
        <Modal isOpen={context.modalOpen} modalStyle={'upload-property-modal'}>
            <CloseWindowX onClose={()=>{context.clearStorage();context.handleModalClose();}}/>
            <PropertyStepForm type='upload'/>
        </Modal>
    </div>
  )
}

export default UploadPropertyButtonModal