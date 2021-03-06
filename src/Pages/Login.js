import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from "../Context/AuthProvider"
export const Login = () => {
    const navigate = useNavigate();
    const { loginUserWithCredentials } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showpasswordState, setPassState] = useState(false)
    const [errorState, setErrorState] = useState(false);
    async function loginHandler(e, email, password) {
        e.preventDefault()
        const response = await loginUserWithCredentials(email, password)
        if (response.success)
            navigate("/")
        else {
            setEmail('');
            setPassword('')
            setErrorState(true);
        }
    }
    return (
        <div className="Login-container">
            <form className="Login-box" onSubmit={(e) => loginHandler(e, email, password)}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h1>Log </h1>
                    <h1 style={{ color: "var(--primary)" }}>IN</h1>
                </div>
                <div className="input-box-text">
                    <input type="email" required value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-box-password">
                    <input type={showpasswordState ? "text" : "password"} placeholder="Password" required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="password-state" onClick={() => setPassState(!showpasswordState)}>
                        {showpasswordState ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                    </div>
                </div>
                <button type="submit" className="login-click-btn">Log In</button>
                <p style={{ fontWeight: "bold" }}>Dont have a account?
                <Link to="/signup" style={{ textDecoration: "none" }}>
                        Sign Up</Link>
                </p>
                {errorState ? "" : <br />}
                <p style={{
                    display: errorState ? "block" : "none",
                    color: "red",
                    fontWeight: "bold",
                    padding: "5px 0"
                }}>Wrong email or password entered</p>
            </form>
        </div>
    );
}