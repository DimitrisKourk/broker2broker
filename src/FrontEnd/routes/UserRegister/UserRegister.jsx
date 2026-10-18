import {Link} from "react-router";
import {useState,useEffect} from "react";
import { apiFetch } from "../../utils/apiClient";
import '../UserLogin/UserLogin.css'
import './UserRegister.css'

function UserRegister() {
    const [name,setName ] = useState("");
    const [surname,setSurname ] = useState("");
    const [businessName,setBusinessName ] = useState("");
    const [AFM,setAFM ] = useState("");
    const [areaOfOperation,setAreaOfOperation ] = useState("");
    const [email,setEmail ] = useState("");
    const [phoneMobile,setPhoneMobile ] = useState("");
    const [phoneLandline,setPhoneLandline ] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [availableUsername, setAvailableUsername] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!password.trim() || !username.trim()) {
            alert("Input cannot be empty!");
        } else {
            let userData={name:name,surname:surname,business_name:businessName,AFM:AFM,area_of_operation:areaOfOperation,email:email,phone_mobile:phoneMobile,phone_landline:phoneLandline,username: username, password: password};
            apiFetch('/api/user/auth/register/submit-user-info', { method: "POST", json: userData })
            .then(res => {
                alert(res.message);
            })
            .catch(e => {
                console.log(e)
            })
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log(username)
            apiFetch('/api/user/auth/register/check-username', { method: "POST", json: {username: username} })
                .then(res => {
                    setAvailableUsername(!res.usernameExists)
                })
                .catch(e => {
                    console.log(e)
                })
        }, 2000)

        return () => clearTimeout(delayDebounceFn)
    }, [username])

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
    }
    const handleBusinessNameChange = (event) => {
        setBusinessName(event.target.value);
    }
    const handleAFMChange = (event) => {
        setAFM(event.target.value);
    }
    const handleAreaOfOperationChange = (event) => {
        setAreaOfOperation(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePhoneMobileChange = (event) => {
        setPhoneMobile(event.target.value);
    }
    const handlePhoneLandlineChange = (event) => {
        setPhoneLandline(event.target.value);
    }
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const usernameIsValid = availableUsername && username !== '';
    const passwordsMatch = password === confirmPassword && password !== '';
    const canSubmit = passwordsMatch && username!=='' && name!==''&& surname!==''&& AFM!==''&& areaOfOperation!==''&& email!==''&& businessName!==''&& phoneLandline!=='' && phoneMobile!=='';

    const ValidityIcon = ({valid}) => (
        <svg className={valid ? "validity-icon valid" : "validity-icon invalid"} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
    );

    return (
        <div className="auth-form-page">
            <div className="auth-form-card register-card">
                <h2>Create your account</h2>
                <p className="auth-form-subtitle">Enter your business and contact details to register</p>

                <form onSubmit={(event)=>handleSubmit(event)} className="register-form-grid">
                    <div className="form-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name"
                           placeholder="Enter your name" required onChange={handleNameChange}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="surname">Surname</label>
                        <input type="text" id="surname" name="surname"
                               placeholder="Enter your surname" required onChange={handleSurnameChange}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="businessName">Business Name</label>
                        <input type="text" id="businessName" name="businessName"
                               placeholder="Enter your business name" required onChange={handleBusinessNameChange}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="AFM">AFM</label>
                        <input type="text" id="AFM" name="AFM"
                               placeholder="Enter your AFM" required onChange={handleAFMChange}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="areaOfOperation">Area of Operation</label>
                        <input type="text" id="areaOfOperation" name="areaOfOperation"
                               placeholder="Enter your area of operation" required onChange={handleAreaOfOperationChange}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email"
                               placeholder="Enter your email" required onChange={handleEmailChange}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="phoneMobile">Phone Mobile</label>
                        <input type="text" id="phoneMobile" name="phoneMobile"
                               placeholder="Enter your phone mobile" required onChange={handlePhoneMobileChange}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="phoneLandline">Phone Landline</label>
                        <input type="text" id="phoneLandline" name="phoneLandline"
                               placeholder="Enter your phone landline" required onChange={handlePhoneLandlineChange}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="username">Username</label>
                        <div className="input-with-icon">
                            <input type="text" id="username" name="username"
                                   placeholder="Enter your username" required onChange={handleUsernameChange}/>
                            {username!=='' && <ValidityIcon valid={usernameIsValid}/>}
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password"
                               placeholder="Enter your password" required onChange={handlePasswordChange}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="input-with-icon">
                            <input type="password" id="confirmPassword" name="confirmPassword"
                                   placeholder="Confirm your password" required onChange={handleConfirmPasswordChange}/>
                            {confirmPassword!=='' && <ValidityIcon valid={passwordsMatch}/>}
                        </div>
                    </div>

                    <button type="submit" className="auth-form-submit register-submit" disabled={!canSubmit}>
                        Submit
                    </button>
                </form>

                <p className="auth-form-footer">Already registered?{' '}
                    <Link to="/auth/login">
                        Login to your account
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default UserRegister