import {UsePropertyStepForm} from "../../PropertyStepFormContext/PropertyStepFormContext";
import '../StepsStyles/Step1.css'

const PropertyStepFormStep1 = () => {
    const context=UsePropertyStepForm();
    
    const handleSaleClick=()=>{
        context.setProperty({...context.property,rental:0});
    }
    const handleRentClick=()=>{
        context.setProperty({...context.property,rental:1});
    }

  return (
    <div className='PropertyStepFormStep1'>
        <div className="middle">
            <label>
                <input 
                    type="radio" 
                    name="status" 
                    value={1} 
                    checked={context.property?.rental === 1} 
                    onChange={handleRentClick} 
                    /> 
                <div className="for-rent box">
                <span>Rent</span>
                </div>
            </label>

            <label>
                <input 
                    type="radio" 
                    name="status" 
                    value={0} 
                    checked={context.property?.rental === 0} 
                    onChange={handleSaleClick} 
                    />             
                    <div className="for-sale box">
                <span>Sale</span>
                </div>
            </label>
        </div>
    </div>
  )
}

export default PropertyStepFormStep1