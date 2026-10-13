import "./ToggleSwitch.css";

const ToggleSwitch = ({ label ,isChecked, onToggle}) => {
  return (
    <div className="toggle-switch-container">
      {label}
      <div className="toggle-switch">
        <input type="checkbox" className="toggle-switch-checkbox" 
               name={label} id={label} checked={isChecked} onChange={onToggle}/>
        <label className="toggle-switch-label" htmlFor={label}>
          <span className="toggle-switch-inner" />
          <span className="toggle-switch-switch" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;