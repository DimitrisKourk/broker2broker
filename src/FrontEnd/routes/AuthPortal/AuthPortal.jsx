import { useNavigate } from 'react-router'
import { useAuth } from '../../components/AuthContext/AuthContext';
import { useEffect } from 'react';
import './AuthPortal.css'

function AuthPortal() {
    const auth=useAuth()
    const nagivate=useNavigate();
    const handleRedirectLogin=()=>{
        nagivate("/auth/login")
    }
    const handleRedirectRegister=()=>{
        nagivate("/auth/register")
    }
    
  return (
    <div className='auth-portal-wrapper'>
        <div className='login-button-wrapper' onClick={handleRedirectLogin}>
            <div className='login-button'>Log In</div>
        </div>
        <div className='register-button-wrapper' onClick={handleRedirectRegister}>
            <div className='register-button'  >Register</div>
        </div>
    </div>
  )
}

export default AuthPortal