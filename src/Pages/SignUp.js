import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useAuth } from "../Context/AuthProvider"
import { useCart } from '../Context/cart-context'
const SignUp = () => {
    const navigate = useNavigate();
    const { wishList, cartItems } = useCart();
    const [showpasswordState, setPassState] = useState(false);
    const { signinUser } = useAuth()
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorState, setErrorState] = useState(false);
    async function SignupHandler(firstname, lastname, email, password, wishList, cartItems) {
        const response = await signinUser(firstname, lastname, email, password, wishList, cartItems)
        if (response.success)
            navigate("/")
        else {
            setFirstname('')
            setLastname('')
            setEmail('');
            setPassword('')
            setErrorState(true);
        }
    }
    return (
        <div className="Login-container">
            <div className="Login-box">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h1>Sign </h1>
                    <h1 style={{ color: "var(--primary)" }}>UP</h1>
                </div>
                <div className="input-box-text">
                    <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                </div>
                <div className="input-box-text">
                    <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                </div>
                <div className="input-box-text">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <p style={{
                    display: errorState ? "block" : "none",
                    color: "red",
                    fontWeight: "bold",
                }}>Enter a valid email</p>

                <div className="input-box-password">
                    <input type={showpasswordState ? "text" : "password"} placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="password-state" onClick={() => setPassState(!showpasswordState)}>
                        {showpasswordState ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                    </div>
                </div>
                <button className="signup-click-btn"
                    onClick={() => SignupHandler(firstname, lastname, email, password, wishList, cartItems)}
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
