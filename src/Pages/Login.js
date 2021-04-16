import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../Context/AuthProvider"

const Login = () => {
    const { loginUserWithCredentials } = useAuth()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showpasswordState, setPassState] = useState(false)
    return (
        <div className="Login-container">
            <div className="Login-box">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h1>Log </h1>
                    <h1 style={{ color: "var(--primary)" }}>IN</h1>
                </div>
                <div className="input-box-text">
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-box-password">
                    <input type={showpasswordState ? "text" : "password"} placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="password-state" onClick={() => setPassState(!showpasswordState)}>
                        {showpasswordState ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                    </div>
                </div>
                <button className="login-click-btn"
                onClick={() => loginUserWithCredentials(username, password)}
                >Log In</button>
                <p style={{ fontWeight: "bold" }}>Dont have a account?
                <Link to="/signup" style={{ textDecoration: "none" }}>
                        Sign Up</Link>
                </p>
                <br />
            </div>
        </div>
    );
}

export default Login;
