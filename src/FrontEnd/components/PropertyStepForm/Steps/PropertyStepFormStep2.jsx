import { useState } from 'react';
import {UsePropertyStepForm} from "../../PropertyStepFormContext/PropertyStepFormContext";
import '../StepsStyles/Step2.css'


const PropertyStepFormStep2 = () => {
  const context=UsePropertyStepForm();
      
  const handleAppartmentClick=()=>{
      context.setProperty({...context.property,property_type:"Appartment"});
  }
  const handleMonokatoikiaClick=()=>{
      context.setProperty({...context.property,property_type:"Monokatoikia"});
  }
  const handleParkingClick=()=>{
      context.setProperty({...context.property,property_type:"Parking"});
  }
  const handleStorageUnitClick=()=>{
      context.setProperty({...context.property,property_type:"Storage Unit"});
  }
  
  return (
    <div className='PropertyStepFormStep2'>
            <label className='property-type-selection'>
                <input 
                    type="radio" 
                    name="type" 
                    checked={context.property?.property_type === "Appartment"} 
                    onChange={handleAppartmentClick} 
                    /> 
                <div>
                <h3 >Appartment</h3>
                </div>
            </label>

            <label className='property-type-selection'>
                <input 
                    type="radio" 
                    name="type" 
                    checked={context.property?.property_type==="Monokatoikia"} 
                    onChange={handleMonokatoikiaClick} 
                    />             
                <div >
                    <h3>Monokatoikia</h3>
                </div>
            </label>
            <label className='property-type-selection'>
                <input 
                    type="radio" 
                    name="type" 
                    checked={context.property?.property_type==="Parking"} 
                    onChange={handleParkingClick} 
                    />             
                <div>
                    <h3>Parking</h3>
                </div>
            </label>
            <label className='property-type-selection'>
                <input 
                    type="radio" 
                    name="type" 
                    checked={context.property?.property_type==="Storage Unit"} 
                    onChange={handleStorageUnitClick} 
                    />             
                <div>
                    <h3>Storage Unit</h3>
                </div>
            </label>
    </div>
  )
}

export default PropertyStepFormStep2