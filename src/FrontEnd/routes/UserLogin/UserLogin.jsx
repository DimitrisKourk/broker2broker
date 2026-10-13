import React from 'react'
import {Link, redirect} from "react-router";
import {useState} from "react";
import {useAuth} from "../../components/AuthContext/AuthContext";

function UserLogin({redirectionURL}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const auth = useAuth();
    const handleSubmit =async (event) => {
        event.preventDefault();

        if (!password.trim() || !username.trim()) {
            alert("Input cannot be empty!");
        } else {
           await auth.loginAction({username: username, password: password},redirectionURL);
        }

    };


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div>UserLogin
            <div className="loginPage">
                <h3>Enter your login credentials</h3>

                <form onSubmit={(event)=>handleSubmit(event)}>
                    <label htmlFor="first">
                        Username:
                    </label>
                    <input type="text" id="first" name="first"
                           placeholder="Enter your Username" required onChange={handleUsernameChange}/>

                    <label htmlFor="password">
                        Password:
                    </label>
                    <input type="password" id="password" name="password"
                           placeholder="Enter your Password" required onChange={handlePasswordChange}/>

                    <div className="wrap">
                        <button type="submit">
                            Submit
                        </button>
                    </div>
                </form>

                <p>Not registered?
                    <Link to="/auth/register" className="registerButton">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default UserLogin
