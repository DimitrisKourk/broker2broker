
import { useState } from 'react';
import {UsePropertyStepForm} from "../../PropertyStepFormContext/PropertyStepFormContext";
import Select from 'react-select';
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';
import TextInputComponent from '../../TextInputComponent/TextInputComponent';
import '../StepsStyles/Step6.css';


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

const PropertyStepFormStep6 = () => {
    const context=UsePropertyStepForm();
    const [propertyState,setPropertyState]=useState(context.property?.property_state || '');
    const [parkingSpaces,setParkingSpaces]=useState(context.property?.parking_spaces || 0);
    const [balcony,setBalcony]=useState(context.property?.balcony || false);
    const [balconySqm,setBalconySqm]=useState(context.property?.balcony_square_meters || 0);
    const [oriantation,setOrientation]=useState(context.property?.property_orientation || '');
    const oriantationOptions=[{value:"North",label:"North"}, {value:"South",label:"South"},{value:"East",label:"East"},{value:"West",label:"West"},{value:"Northeast",label:"Northeast"},{value:"Northwest",label:"Northwest"},{value:"Southeast",label:"Southeast"},{value:"Southwest",label:"Southwest"}];
    const propertyStateOptions=[{value:"Renovated",label:"Renovated"}, {value:"Partially Renovated",label:"Partially Renovated"},{value:"Needs Renovation",label:"Needs Renovation"}];
    const numericOptions=[{value:0,label:"0"}, {value:1,label:"1"},{value:2,label:"2"},{value:3,label:"3"},{value:4,label:"4"},{value:5,label:"5"},{value:6,label:"6"},{value:7,label:"7"},{value:8,label:"8"},{value:9,label:"9"},{value:10,label:"10+"}];

    const handlePropertyStateChange=(option)=>{
        setPropertyState(option.value);
        context.setProperty({...context.property,property_state:option.value});
    }
    const handleConstructionYearChange=(event)=>{
        context.setProperty({...context.property,construction_date:event.target.value});
    }
    const handleParkingSpacesChange=(option)=>{
        setParkingSpaces(option.value);
        context.setProperty({...context.property,parking_spaces:option.value});
    }
    const handleBalconyChange=(event)=>{
        setBalcony(event.target.checked);
        context.setProperty({...context.property,balcony:event.target.checked});
    }
    const handleBalconySqmChange=(event)=>{
        setBalconySqm(event.target.value);
        context.setProperty({...context.property,balcony_square_meters:event.target.value});
    }
    const handleOrientationChange=(option)=>{
        setOrientation(option.value);
        context.setProperty({...context.property,property_orientation:option.value});
    }
    

  return (
    <div className='PropertyStepFormStep6'>
        
        <TextInputComponent mode="numeric" label="Construction Year" inputId="constructionYear" value={context.property?.construction_date} handler={()=>handleConstructionYearChange}/>
        <div className='formSelectContainer'>
            <label htmlFor="propertyState">Property State:</label>
            <Select
                styles={customStyles}
                value={propertyState && {value: propertyState, label: propertyState}}
                onChange={handlePropertyStateChange}
                options={propertyStateOptions}
                placeholder="Select Property State"
                />
        </div>

        <div className='formSelectContainer'>
            <label htmlFor="parkingSpaces">Parking Spaces:</label>
            <Select
                styles={customStyles}
                value={parkingSpaces && {value: parkingSpaces, label: parkingSpaces.toString()}}
                onChange={(value)=>{handleParkingSpacesChange(value)}}
                options={numericOptions}
                placeholder="Select Parking Spaces..."
                />
        </div>

        <div className='formSelectContainer'>
            <label htmlFor="orientation">Orientation:</label>
            <Select
                styles={customStyles}
                value={oriantation && {value: oriantation, label: oriantation}}
                onChange={handleOrientationChange}
                options={oriantationOptions}
                placeholder="Select Orientation"
                />
        </div>
        <div>
            <ToggleSwitch label="Balcony"  isChecked={balcony} onToggle={handleBalconyChange}/>
        </div>
        {context.property.balcony?
        <TextInputComponent mode="numeric" label="Balcony Square Meters" inputId="balconysqm" value={context.property?.balcony_square_meters} handler={()=>handleBalconySqmChange}/>
        :null
        }

    </div>
  )
}

export default PropertyStepFormStep6