import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../Context/AuthProvider"
import {useCart} from '../Context/cart-context'
const SignUp = () => {
    const { wishList, cartItems } = useCart();
    const [showpasswordState, setPassState] = useState(false);
    const { signinUser } = useAuth()
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
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
                    <input type="text" placeholder="First Name" onChange={(e) => setFirstname(e.target.value)} />
                </div>
                <div className="input-box-text">
                    <input type="text" placeholder="Last Name" onChange={(e) => setLastname(e.target.value)} />
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
                    onClick={() => signinUser(firstname, lastname, email, password,wishList, cartItems)}
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
