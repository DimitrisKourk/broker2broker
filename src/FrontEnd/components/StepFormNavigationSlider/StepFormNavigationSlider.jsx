import React from 'react'
import './StepFormNavigationSlider.css'
import { UsePropertyStepForm } from '../PropertyStepFormContext/PropertyStepFormContext'
function StepFormNavigationSlider({step}) {
    const context=UsePropertyStepForm();
    const handleStepChange =(step)=>{
        context.goToStep(step)
    }

  return (
    <div className='step-slider-container'>
        <div className="step-slider">
            <input type="radio" name="form-step" id="1" value={1} checked={step === 1} readOnly/>
            <label htmlFor="1" form-step="1" onClick={()=>handleStepChange(1)}></label>
            <input type="radio" name="form-step" id="2" value={2} checked={step === 2} readOnly/>
            <label htmlFor="2" form-step="2" onClick={()=>handleStepChange(2)}></label>
            <input type="radio" name="form-step" id="3" value={3} checked={step === 3} readOnly/>
            <label htmlFor="3" form-step="3" onClick={()=>handleStepChange(3)}></label>
            <input type="radio" name="form-step" id="4" value={4} checked={step === 4} readOnly/>
            <label htmlFor="4" form-step="4" onClick={()=>handleStepChange(4)}></label>
            <input type="radio" name="form-step" id="5" value={5} checked={step === 5} readOnly/>
            <label htmlFor="5" form-step="5" onClick={()=>handleStepChange(5)}></label>
            <input type="radio" name="form-step" id="6" value={6} checked={step === 6} readOnly/>
            <label htmlFor="6" form-step="6" onClick={()=>handleStepChange(6)}></label>
            <input type="radio" name="form-step" id="7" value={7} checked={step === 7} readOnly/>
            <label htmlFor="7" form-step="7" onClick={()=>handleStepChange(7)}></label>
            <input type="radio" name="form-step" id="8" value={8} checked={step === 8} readOnly/>
            <label htmlFor="8" form-step="8" onClick={()=>handleStepChange(8)}></label>
            <input type="radio" name="form-step" id="9" value={9} checked={step === 9} readOnly/>
            <label htmlFor="9" form-step="9" onClick={()=>handleStepChange(9)}></label>
            <div className="step-pos"></div>
        </div>
    </div>
  )
}

export default StepFormNavigationSlider