import { UsePropertyDetails } from "../PropertyDetailsContext/PropertyDetailsContext";
import Modal from "../Modal/Modal";
import CloseWindowX from "../CloseWindowX/CloseWindow";
import PropertyDetails from "../PropertyDetails/PropertyDetails";
import './PropertyDetailsButtonModal.css'



function PropertyDetailsButtonModal({propertyId}) {
    const context=UsePropertyDetails();
    const handleButtonClick = () => {
        context.handleModalOpen();
    };
    //the style property in modal is the css class defined in this components css
  return (
    <div className="DetailsButtonWrapper">
        <button className="DetailsButton" onClick={handleButtonClick}>Details</button>
        
        <Modal isOpen={context.modalOpen} modalStyle="property-details-modal"> 
            <CloseWindowX onClose={()=>{context.handleModalClose();}}/>
                <PropertyDetails propertyId={propertyId}/>
        </Modal>
    </div>
  )
}

export default PropertyDetailsButtonModal