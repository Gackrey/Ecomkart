import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [showpasswordState, setPassState] = useState(false)
    return (
        <div className="Login-container">
            <div className="Login-box">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h1>Sign </h1>
                    <h1 style={{ color: "var(--primary)" }}>UP</h1>
                </div>
                <div className="input-box-text">
                    <input type="text" placeholder="Username" />
                </div>
                <div className="input-box-text">
                    <input type="email" placeholder="Email" />
                </div>
                <div className="input-box-password">
                    <input type={showpasswordState ? "text" : "password"} placeholder="Password" />
                    <div className="password-state" onClick={() => setPassState(!showpasswordState)}>
                        {showpasswordState ? <i class="fas fa-eye-slash"></i> : <i class="fas fa-eye"></i>}
                    </div>
                </div>
                <button className="signup-click-btn">Sign Up</button>
                <p style={{fontWeight:"bold"}}>Already a member?
                <Link to="/login" style={{ textDecoration: "none" }}>
                        Log In</Link>
                </p>
                <br/>
            </div>
        </div>
    );
}

export default SignUp;
