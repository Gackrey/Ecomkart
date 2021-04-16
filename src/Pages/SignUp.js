import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../Redux/AuthProvider"
const SignUp = () => {
    const [showpasswordState, setPassState] = useState(false);
    const { signinUser } = useAuth()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="Login-container">
            <div className="Login-box">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h1>Sign </h1>
                    <h1 style={{ color: "var(--primary)" }}>UP</h1>
                </div>
                <div className="input-box-text">
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-box-text">
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-box-password">
                    <input type={showpasswordState ? "text" : "password"} placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="password-state" onClick={() => setPassState(!showpasswordState)}>
                        {showpasswordState ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                    </div>
                </div>
                <button className="signup-click-btn"
                    onClick={() => signinUser(username, email, password)}
                >Sign Up</button>
                <p style={{ fontWeight: "bold" }}>Already a member?
                <Link to="/login" style={{ textDecoration: "none" }}>
                        Log In</Link>
                </p>
                <br />
            </div>
        </div>
    );
}

export default SignUp;
