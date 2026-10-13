import {Link} from "react-router";
import {useState,useEffect} from "react";

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
            fetch('http://localhost:3000/api/user/auth/register/submit-user-info', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            })
            .then(response => response.json())
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
            fetch('http://localhost:3000/api/user/auth/register/check-username', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: username}),
            })
                .then(response => response.json())
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

    return (
        <div>UserRegister
            <div className="loginPage">
                <h1>PropertiesB2B</h1>
                <h3>Enter your credentials to Register</h3>

                <form onSubmit={(event)=>handleSubmit(event)}>
                    <div>
                        <label htmlFor="name">
                            Name:
                        </label>
                        <input type="text" id="name" name="name"
                           placeholder="Enter your name" required onChange={handleNameChange}/>
                    </div>

                    <div>
                        <label htmlFor="surname">
                            Surname:
                        </label>
                        <input type="text" id="surname" name="surname"
                               placeholder="Enter your surname" required onChange={handleSurnameChange}/>
                    </div>

                    <div>
                        <label htmlFor="businessName">
                            Business Name:
                        </label>
                        <input type="text" id="businessName" name="businessName"
                               placeholder="Enter your business name" required onChange={handleBusinessNameChange}/>
                    </div>
                    <div>
                        <label htmlFor="AFM">
                            AFM:
                        </label>
                        <input type="text" id="AFM" name="AFM"
                               placeholder="Enter your AFM" required onChange={handleAFMChange}/>
                    </div>

                    <div>
                        <label htmlFor="areaOfOperation">
                            Area of Operation:
                        </label>
                        <input type="text" id="areaOfOperation" name="areaOfOperation"
                               placeholder="Enter your area of operation" required onChange={handleAreaOfOperationChange}/>
                    </div>
                    <div>
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input type="text" id="email" name="email"
                               placeholder="Enter your email" required onChange={handleEmailChange}/>
                    </div>
                    <div>
                        <label htmlFor="phoneMobile">
                            Phone Mobile:
                        </label>
                        <input type="text" id="phoneMobile" name="phoneMobile"
                               placeholder="Enter your phone mobile" required onChange={handlePhoneMobileChange}/>
                    </div>
                    <div>
                        <label htmlFor="phoneLandline">
                            Phone Landline:
                        </label>
                        <input type="text" id="phoneLandline" name="phoneLandline"
                               placeholder="Enter your phone landline" required onChange={handlePhoneLandlineChange}/>
                    </div>

                    <div>
                        <label htmlFor="username">
                            Username:
                        </label>
                        <input type="text" id="username" name="username"
                               placeholder="Enter your Username" required onChange={handleUsernameChange}/>
                        {(availableUsername && username !== '') ?
                            <svg style={{color: 'green'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                            :  <svg style={{color: 'red'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                        }
                    </div>

                    <div>
                        <label htmlFor="password">
                            Password:
                        </label>
                        <input type="password" id="password" name="password"
                               placeholder="Enter your Password" required onChange={handlePasswordChange}/>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">
                            Confirm Password:
                        </label>
                        <input type="password" id="confirmPassword" name="confirmPassword"
                               placeholder="Confirm your Password" required onChange={handleConfirmPasswordChange}/>
                        {(password === confirmPassword && password !== '') ?
                            <svg style={{color: 'green'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                            :  <svg style={{color: 'red'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                        }
                        </div>

                        <div className="wrap">
                            <button type="submit"
                                    style={(password === confirmPassword && password !== ''&& username!=='' && name!==''&& surname!==''&& AFM!==''&& areaOfOperation!==''&& email!==''&& businessName!==''&& phoneLandline!=='' && phoneMobile!=='') ?styles.enabledButton:styles.disabledButton }>
                                Submit
                            </button>
                        </div>
                </form>

                    <p>Already registered?
                    <Link to="/auth/login" className="loginButton">
                                Login to your account
                            </Link>
                        </p>
            </div>
        </div>
    )
}

export default UserRegister

const styles = {
    disabledButton: {
        clickevents: 'none',
        backgroundColor: 'gray',
        color: 'white',
        cursor: 'not-allowed',
        margin: 10,
        padding: 15,
        borderRadius: "8px",
        border: "none",
        boxShadow: "0px 0px 10px 0px grey",
    },
    enabledButton: {
        backgroundColor: 'red',
        color: 'white',
        cursor: 'pointer',
        margin: 10,
        padding: 15,
        borderRadius: "8px",
        border: "none",
        boxShadow: "0px 0px 10px 0px grey",
    },
};