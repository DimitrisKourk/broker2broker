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
        //context isn't memoized by PropertyDetailsProvider (a new object every render), so adding it
        //here would refetch in a loop once the calls above set state - only re-run on propertyId change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[propertyId])
  return (
    <div className="property-details-wrapper" >
        <PropertyDetailsTop/>
        <PropertyDetailsTable/>
    </div>
  )
}

export default PropertyDetails