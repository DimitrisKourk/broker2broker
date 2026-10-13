import {UsePropertyStepForm} from "../../PropertyStepFormContext/PropertyStepFormContext";
import TextInputComponent from "../../TextInputComponent/TextInputComponent"
import "../StepsStyles/Step3.css"

const PropertyStepFormStep3 = () => {
    const context=UsePropertyStepForm();
    
    
    const handleCountryChange=(event)=>{
        context.setProperty({...context.property,country:event.target.value});
    }
    const handleRegionChange=(event)=>{
        context.setProperty({...context.property,region:event.target.value});
    }
    const handleRegionalUnitChange=(event)=>{
        context.setProperty({...context.property,regional_unit:event.target.value});
    }
    const handleMunicipalityChange=(event)=>{
        context.setProperty({...context.property,municipality:event.target.value});
    }
    const handleCityChange=(event)=>{
            context.setProperty({...context.property,city:event.target.value});
        }
    const handleNeighborhoodChange=(event)=>{
        context.setProperty({...context.property,neighborhood:event.target.value});
    }
        const handleAddressChange=(event)=>{
        context.setProperty({...context.property,property_address:event.target.value});
    }
    const handleOwnerNameChange=(event)=>{
        context.setProperty({...context.property,property_owner_name:event.target.value});
    }
    const handleOwnerPhoneChange=(event)=>{
        context.setProperty({...context.property,property_owner_phone:event.target.value});
    }

    

    //<TextInputComponent mode="text" label="Country" id="country" value={context.property.country} handler={()=>handleCountryChange}/>

    return (
        <div className='PropertyStepFormStep3'>
            <TextInputComponent mode="text" label="Region" id="region" value={context.property.region} handler={()=>handleRegionChange}/>
            <TextInputComponent mode="text" label="Regional Unit" id="regionalUnit" value={context.property.regional_unit} handler={()=>handleRegionalUnitChange}/>
            <TextInputComponent mode="text" label="Municipality" id="municipality" value={context.property.municipality} handler={()=>handleMunicipalityChange}/>
            <TextInputComponent mode="text" label="City" id="city" value={context.property.city} handler={()=>handleCityChange}/>
            <TextInputComponent mode="text" label="Neighborhood" id="neighborhood" value={context.property.neighborhood} handler={()=>handleNeighborhoodChange}/>    
            <TextInputComponent mode="text" label="Address" id="address" value={context.property.property_address} handler={()=>handleAddressChange}/>    
            <TextInputComponent mode="text" label="Owner Name" id="ownerName" value={context.property.property_owner_name} handler={()=>handleOwnerNameChange}/>    
            <TextInputComponent mode="text" label="Owner Phone" id="ownerPhone" value={context.property.property_owner_phone} handler={()=>handleOwnerPhoneChange}/>    
        </div>
    )
}


export default PropertyStepFormStep3



