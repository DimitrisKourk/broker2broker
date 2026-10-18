import React from 'react'
import {Link} from "react-router";
import {useState} from "react";
import {useAuth} from "../../components/AuthContext/AuthContext";
import './UserLogin.css'

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
        <div className="auth-form-page">
            <div className="auth-form-card">
                <h2>Welcome back</h2>
                <p className="auth-form-subtitle">Enter your login credentials</p>

                <form onSubmit={(event)=>handleSubmit(event)}>
                    <label htmlFor="first">
                        Username
                    </label>
                    <input type="text" id="first" name="first"
                           placeholder="Enter your username" required onChange={handleUsernameChange}/>

                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" id="password" name="password"
                           placeholder="Enter your password" required onChange={handlePasswordChange}/>

                    <button type="submit" className="auth-form-submit">
                        Submit
                    </button>
                </form>

                <p className="auth-form-footer">Not registered?{' '}
                    <Link to="/auth/register">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default UserLogin
