import { useState } from "react";
import { UsePropertyStepForm } from "../../PropertyStepFormContext/PropertyStepFormContext"
import TextInputComponent from "../../TextInputComponent/TextInputComponent";
import debounce from "../../../utils/debounce";
import '../StepsStyles/Step8.css';
import Select from "react-select";
const customStyles = {
    container: provided => ({
    ...provided,
    width:"50%",
    marginLeft: "1em"

  }),
    control: (provided,state)=>({
        ...provided,
        backgroundColor:"none",
        color:"white",
        borderColor: state.isFocused?'#f67d00':"white",
        boxShadow: state.isFocused?'0 0 0 1px #f67d00':'0 0 0 1px white',
        "&:hover":{
                borderColor: '#f67d00',
                boxShadow:'0 0 0 1px #f67d00'
        },
    }),
    singleValue:(provided) => ({
      ...provided,
      color: 'white',
    }),
    option: (provided,state) => ({
      ...provided,
      backgroundColor: state.isSelected?'#f67d00':"white",
      color:state.isSelected?'white':'black',
      "&:hover":{
              backgroundColor: '#ff9020ff',
              color:' #ffffffff'
      },
  }),
  }


const PropertyStepFormStep9 = () => {
    const propertyVisibilityOptions=[{value:"Private",label:"Private"}, {value:"Associates",label:"Associates"},{value:"Region",label:"Region"},{value:"Public",label:"Public"}];

    const context=UsePropertyStepForm();


    const handleDescriptionChange=(e)=>{
        console.log(e.target.value)
        context.setProperty({...context.property,description:e.target.value});
    }
    
    let optimisedHandleChange = debounce(handleDescriptionChange,500);
    
    const handleVisibilityChange=(option)=>{
        context.setProperty({...context.property,visibility:option.value});
    }
    
    const handlePriceChange=(e)=>{
        context.setProperty({...context.property,price:e.target.value});
    }
    
  return (
    <div className="PropertyStepFormStep8">
        {context.property.rental?<h2>Rent Price per Month</h2>:<h2>Selling Price</h2>}
        <div className="wrapper">
          <TextInputComponent mode="numeric" label="Price" inputId="price" value={context.property?.price} handler={()=>handlePriceChange}/>
          <div className='visibility-selection-container'>
            <label htmlFor="orientation">Property Visibility:</label>
            <Select
                styles={customStyles}
                value={context.property?.visibility && {value: context.property?.visibility , label: context.property?.visibility }}
                onChange={handleVisibilityChange}
                options={propertyVisibilityOptions}
                placeholder="Select Visibility"
                />
        </div>
        </div>
        <h2>Description</h2>
        <span>({context.property?.description?.length||0}/500)</span>
        <textarea name="description" id="description" maxLength={500} defaultValue={context.property?.description} placeholder="Short Property Description..." onChange={optimisedHandleChange} ></textarea>

    </div>
  )
}

export default PropertyStepFormStep9

