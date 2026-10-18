import './TextInputComponent.css'
function TextInputComponent({mode,label,inputId,handler,value}) {

  return (
  <div className='text-input-component'>
    <div className="input-field">
      <input id={inputId} type="text" inputMode={mode} placeholder={label} value={value} onChange={handler()}/>
      <label htmlFor={inputId}>{label}</label>
      <div className="border-bottom"></div>
    </div>
  </div>
  )
}

export default TextInputComponent