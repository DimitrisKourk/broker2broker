import Modal from "../Modal/Modal"
import { UsePropertyStepForm} from "../PropertyStepFormContext/PropertyStepFormContext";
import PropertyStepForm from "../PropertyStepForm/PropertyStepForm";
import CloseWindowX from "../CloseWindowX/CloseWindow";
import './PropertyButtonModal.css';

function PropertyButtonModal({mode='upload',propertyId}){
    const context=UsePropertyStepForm()
    const isUpdate=mode==='update';

    const handleButtonClick = () => {
        context.handleModalOpen();
    };

  return (
    <div className={isUpdate?"update-button-wrapper":"UploadButtonWrapper"}>
        <button className={isUpdate?"update-button":"UploadButton"} onClick={handleButtonClick}>
            {isUpdate
                ? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg>
                : "Upload Property"}
        </button>
        <Modal isOpen={context.modalOpen} modalStyle={'upload-property-modal'}>
            <CloseWindowX onClose={()=>{context.clearStorage();context.handleModalClose();}}/>
            <PropertyStepForm type={mode} propertyId={propertyId}/>
        </Modal>
    </div>
  )
}

export default PropertyButtonModal
