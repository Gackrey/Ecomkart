import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [showpasswordState, setPassState] = useState(false)
    return (
        <div className="Login-container">
            <div className="Login-box">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h1>Log </h1>
                    <h1 style={{ color: "var(--primary)" }}>IN</h1>
                </div>
                <div className="input-box-text">
                    <input type="text" placeholder="Username" />
                </div>
                <div className="input-box-password">
                    <input type={showpasswordState ? "text" : "password"} placeholder="Password" />
                    <div className="password-state" onClick={() => setPassState(!showpasswordState)}>
                        {showpasswordState ? <i class="fas fa-eye-slash"></i> : <i class="fas fa-eye"></i>}
                    </div>
                </div>
                <button className="login-click-btn">Log In</button>
                <p style={{fontWeight:"bold"}}>Dont have a account?
                <Link to="/signup" style={{ textDecoration: "none" }}>
                        Sign Up</Link>
                </p>
                <br/>
            </div>
        </div>
    );
}

export default Login;
