import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "@ecomkart/context/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Login = () => {
  const navigate = useNavigate();
  const { loginUserWithCredentials } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpasswordState, setPassState] = useState(false);
  const [errorState, setErrorState] = useState(false);
  async function loginHandler(e, email, password) {
    e.preventDefault();
    const response = await loginUserWithCredentials(email, password);
    if (response.success) navigate("/");
    else {
      setEmail("");
      setPassword("");
      setErrorState(true);
    }
  }
  function autoFill() {
    setEmail("test@gmail.com");
    setPassword("Qwerty123");
  }
  return (
    <div className="login-container">
      <img className="wave" src="/img/wave.svg" alt="wave" />
      <div className="login-box-wrapper">
        <form
          className="login-box"
          onSubmit={(e) => loginHandler(e, email, password)}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>Log </h1>
            <h1 style={{ marginLeft: 5, color: "var(--primary)" }}> IN</h1>
          </div>
          <div className="input-box-text">
            <input
              type="email"
              required
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-box-password">
            <input
              type={showpasswordState ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="password-state"
              onClick={() => setPassState(!showpasswordState)}
            >
              {showpasswordState ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button type="submit" className="login-click-btn">
            Log In
          </button>
          <br />
          <button type="button" className="login-click-btn" onClick={autoFill}>
            Guest
          </button>
          <p className="disabled-text">
            Dont have a account?
            <Link
              to="/signup"
              style={{ marginLeft: 5, textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </p>
          {errorState ? "" : <br />}
          <p
            style={{
              display: errorState ? "block" : "none",
              color: "red",
              fontWeight: "bold",
              padding: "5px 0",
            }}
          >
            Wrong email or password entered
          </p>
        </form>
      </div>
      <div className="login-banner-wrapper">
        <img className="banner" src="/img/login-logo.svg" alt="banner" />
      </div>
    </div>
  );
};
