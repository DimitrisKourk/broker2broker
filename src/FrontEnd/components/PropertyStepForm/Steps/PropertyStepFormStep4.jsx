import { useState } from 'react';
import {UsePropertyStepForm} from "../../PropertyStepFormContext/PropertyStepFormContext";
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';
import Select from 'react-select';
import '../StepsStyles/Step4.css';
import TextInputComponent from '../../TextInputComponent/TextInputComponent';
const customStyles = {
    container: provided => ({
    ...provided,
    width:"50%",
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

const PropertyStepFormStep4 = () => {
    const context=UsePropertyStepForm();
    const [floor,setFloor]=useState(context.property?.floor || 0);
    const [beds,setBeds]=useState(context.property?.beds || 0);
    const [baths,setBaths]=useState(context.property?.baths || 0);
    const [elevator,setElevator]=useState(context.property?.elevator || false);
    const [sqm,setSqm]=useState(context.property?.square_meters || 0);
    
    
    const handleBedsChange=(option)=>{
        setBeds(option.value);
        context.setProperty({...context.property,beds:option.value});
    }
    const handleBathsChange=(option)=>{
        setBaths(option.value);
        context.setProperty({...context.property,baths:option.value});
    }
    const handleFloorChange=(option)=>{
        setFloor(option.value);
        context.setProperty({...context.property,floor:option.value});
    }

    const handleElevatorChange=(event)=>{
        setElevator(event.target.checked);
        context.setProperty({...context.property,elevator:event.target.checked});
    }
    const handleSqmChange=(event)=>{
        setSqm(event.target.value);
        context.setProperty({...context.property,square_meters:event.target.value});
    }

    const numericOptions=[{value:0,label:"0"}, {value:1,label:"1"},{value:2,label:"2"},{value:3,label:"3"},{value:4,label:"4"},{value:5,label:"5"},{value:6,label:"6"},{value:7,label:"7"},{value:8,label:"8"},{value:9,label:"9"},{value:10,label:"10+"}];


    return (
        <div className='PropertyStepFormStep4'>
                <div className='text-input-wrapper'>
                    <TextInputComponent mode="numeric" label="Square Meters" inputId="sqm" value={context.property?.square_meters} handler={()=>handleSqmChange}/>
                </div>
                <div className='formSelectContainer'> 
                    <label htmlFor="beds">
                    Beds:
                    </label>
                    <Select options={numericOptions}
                            value={beds && {value: beds, label: beds.toString()}}
                            placeholder="Select Bedrooms..." 
                            onChange={(value)=>{handleBedsChange(value)}}
                            styles={customStyles}
                    />
                </div>


                <div className='formSelectContainer'> 
                    <label htmlFor="baths">
                    Baths:
                    </label>
                    <Select options={numericOptions}
                            value={baths && {value: baths, label: baths.toString()}}
                            placeholder="Select Bathrooms..." 
                            onChange={(value)=>{handleBathsChange(value)}}
                            styles={customStyles}
                    />
                </div>

                <div className='formSelectContainer'> 
                    <label htmlFor="floor">
                    Floor:
                    </label>
                    <Select options={numericOptions}
                            value={floor && {value: floor, label: floor.toString()}}
                            placeholder="Select bedrooms..." 
                            onChange={(value)=>{handleFloorChange(value)}}
                            styles={customStyles}
                    />
                </div>

                <div>
                    <ToggleSwitch label="Elevator"  isChecked={elevator} onToggle={handleElevatorChange}/>
                </div>
        </div>
    )
}


export default PropertyStepFormStep4



