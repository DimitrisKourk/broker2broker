import './TextInputComponent.css'
import Select from 'react-select';

function SelectInputComponent({options,label,inputId,handler,selectedValue}) {
  const customStyles = {
    container: provided => ({
    ...provided,
  }),
    singleValue:(provided) => ({
      ...provided,
      color: 'black',
    }),
    option: provided => ({
    ...provided,
    color: 'black'
  }),
  }
  return (
  <div className='text-input-component'>
    <div className="input-field">
      <div className="border-bottom"></div>
        <Select options={options}
                            value={selectedValue && {value: selectedValue, label: selectedValue.toString()}}
                            placeholder="" 
                            onChange={(value)=>{handler(value)}}
                            styles={customStyles}
                    />
      <label htmlFor={inputId}>{label}</label>
    </div>
  </div>
  )
}

export default SelectInputComponent