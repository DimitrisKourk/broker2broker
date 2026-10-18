import {UsePropertyStepForm} from "../PropertyStepFormContext/PropertyStepFormContext";
import PropertyStepFormStep1 from './Steps/PropertyStepFormStep1';
import PropertyStepFormStep2 from './Steps/PropertyStepFormStep2';
import PropertyStepFormStep3 from './Steps/PropertyStepFormStep3';
import PropertyStepFormStep4 from './Steps/PropertyStepFormStep4';
import './PropertyStepForm.css'
import PropertyStepFormStep5 from './Steps/PropertyStepFormStep5';
import PropertyStepFormStep6 from './Steps/PropertyStepFormStep6';
import PropertyStepFormStep7 from './Steps/PropertyStepFormStep7';
import PropertyStepFormStep8 from './Steps/PropertyStepFormStep8';
import PropertyStepFormStep9 from './Steps/PropertyStepFormStep9';

import StepFormNavigationSlider from "../StepFormNavigationSlider/StepFormNavigationSlider";
import { useEffect } from "react";

const  PropertyStepForm=({type,propertyId})=> {
  const context=UsePropertyStepForm(); 
  useEffect(()=>{
    if(type==='update') context.getPropertyDetails(propertyId);
    //context isn't memoized by PropertyStepFormProvider (a new object every render), so adding it
    //here would refetch in a loop once getPropertyDetails() sets state - only re-run on type/propertyId change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[type,propertyId])
  
  return (
    <div className='PropertyStepForm'>
      {type==='upload'?<div className='form-title'>New Property</div >
      :<div className='form-title'>Update Property</div >}
      <StepFormNavigationSlider step={context?.step}/>
      <div className='upload-property-form-button'>
          {(context?.step!==1 && context?.step!==10) ? <div onClick={()=>context.prevStep()}><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223"/></svg></div>: null}
        </div>
        {context?.step===1 && <PropertyStepFormStep1/>}
        {context?.step===2 && <PropertyStepFormStep2/>}
        {context?.step===3 && <PropertyStepFormStep3/>}
        {context?.step===4 && <PropertyStepFormStep4/>}
        {context?.step===5 && <PropertyStepFormStep5/>}
        {context?.step===6 && <PropertyStepFormStep6/>}
        {context?.step===7 && <PropertyStepFormStep7/>}
        {context?.step===8 && <PropertyStepFormStep8/>}
        {context?.step===9 && <PropertyStepFormStep9 type={type}/>}
        {context?.step===10 && <div><h2>Form Submitted Successfully!</h2></div>}
        <div className='upload-property-form-button'>
          {(context?.step!==9 && context?.step!==10) ? <div onClick={()=>context.nextStep()}><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671"/></svg></div>: null}
        </div>
    </div>
  )
}

export default PropertyStepForm