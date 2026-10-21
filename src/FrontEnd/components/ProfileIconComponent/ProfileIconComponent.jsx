import './ProfileIconComponent.css';
import { useAuth } from '../AuthContext/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router';
function ProfileIconComponent() {
    const [open,setOpen]=useState(false);
    const auth=useAuth();
  return (
    <div className="profile-dropdown-container">
        <div className="profile-dropdown" onClick={()=>(setOpen(!open))}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg>
        </div>
        {open?<div className="profile-dropdown-menu">
                    <div className="notifications-dropdown-triangle"></div>
                    <div className="profile-dropdown-body">
                        <Link to={"/my-profile/"+auth.user.username } className='profile-link'>Profile</Link>
                        <Link to='/my-properties' className='properties-link'>Properties</Link>
                        <button className='logout-button' onClick={()=>auth.logOut()}>LogOut</button>
                    </div> 
                </div>
        :null}
    </div>
  )
}

export default ProfileIconComponent