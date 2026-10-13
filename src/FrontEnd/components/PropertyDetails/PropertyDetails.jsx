import { useEffect } from "react"
import { UsePropertyDetails } from "../PropertyDetailsContext/PropertyDetailsContext"
import PropertyDetailsTable from "../PropertyDetailsTable/PropertyDetailsTable";
import './PropertyDetails.css'
import PropertyDetailsTop from "../PropertyDetailsTop/PropertyDetailsTop";


function PropertyDetails({propertyId}) {
    const context= UsePropertyDetails();
    useEffect(()=>{
        context.getPropertyDetails(propertyId);
        context.getPropertyImages(propertyId);
    },[])
  return (
    <div className="property-details-wrapper" >
        <PropertyDetailsTop/>
        <PropertyDetailsTable/>
    </div>
  )
}

export default PropertyDetails