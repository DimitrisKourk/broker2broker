import { useState } from 'react';
import {UsePropertyStepForm} from "../../PropertyStepFormContext/PropertyStepFormContext";
import Select from 'react-select';
import '../StepsStyles/Step5.css';
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

const PropertyStepFormStep5 = () => {
    const context=UsePropertyStepForm();
    const [heatingType,setHeatingType]=useState(context.property?.heating_type || null);
    const [heatingMeans,setHeatingMeans]=useState(context.property?.heating_means || null);
    const [energyClass,setEnergyClass]=useState(context.property?.energy_class || null);
    const heatingMeansOptions=[{value:"Air Condition",label:"Air Condition"}, {value:"Heating diesel",label:"Heating diesel"},{value:"Gas",label:"Gas"},{value:"Wood",label:"Wood"},{value:"Pellets",label:"Pellets"},{value:"Underfloor Heating",label:"Underfloor Heating"},{value:"No Heating Means",label:"No Heating Means"}];
    const heatingTypeOptions=[{value:"Central Heating",label:"Central Heating"}, {value:"Independant Heating", label:"Independant Heating"},{value:"No Heating",label:"No Heating"}];
    const energyClassOptions=[{value:"A+",label:"A+"}, {value:"A",label:"A"},{value:"B+",label:"B+"},{value:"B",label:"B"},{value:"C",label:"C"},{value:"D",label:"D"},{value:"E",label:"E"},,{value:"Z",label:"Z"},{value:"H",label:"H"}];
    const handleHeatingTypeChange=(option)=>{
        setHeatingType(option.value);
        context.setProperty({...context.property,heating_type:option.value});
    }
    const handleHeatingMeansChange=(option)=>{
        setHeatingMeans(option.value);
        context.setProperty({...context.property,heating_means:option.value});
    }
    const handleEnergyClassChange=(option)=>{
        setEnergyClass(option.value);
        context.setProperty({...context.property,energy_class:option.value});
    }


  return (
    <div className='PropertyStepFormStep5'>
        <div className='formSelectContainer'>
            <label htmlFor="heatingType">Heating Type:</label>
            <Select
                styles={customStyles}
                value={heatingType && {value: heatingType, label: heatingType}}
                onChange={handleHeatingTypeChange}
                options={heatingTypeOptions}
                placeholder="Select Heating Type"
                />
        </div>
        <div className='formSelectContainer'>
            <label htmlFor="heatingMeans">Heating Means:</label>
            <Select 
                styles={customStyles}
                value={heatingMeans && {value: heatingMeans, label: heatingMeans}}
                onChange={handleHeatingMeansChange}
                options={heatingMeansOptions}
                placeholder="Select Heating Means"
                />
        </div>
        <div className='formSelectContainer'>
            <label htmlFor="EnergyClass">Energy Class:</label>
            <Select 
                styles={customStyles}
                value={energyClass && {value: energyClass, label: energyClass}}
                onChange={(option)=>{handleEnergyClassChange(option)}}
                options={energyClassOptions}
                placeholder="Select Energy Class"
                />
        </div>

    </div>
  )
}

export default PropertyStepFormStep5