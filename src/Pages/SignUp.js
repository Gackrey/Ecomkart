import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthProvider";

const passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,15}$/;

export const SignUp = () => {
  const navigate = useNavigate();
  const [showpasswordState, setPassState] = useState(false);
  const [showConPasswordState, setConPassState] = useState(false);
  const { signinUser } = useAuth();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [emailErrorState, setEmailErrorState] = useState(false);
  const [passErrorState, setPassErrorState] = useState(false);
  const [conPassErrorState, setConPassErrorState] = useState(false);

  async function SignupHandler(e, firstname, lastname, email, password) {
    e.preventDefault();
    const response = await signinUser(firstname, lastname, email, password);
    if (response.success) navigate("/");
    else {
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setEmailErrorState(true);
    }
  }
  useEffect(() => {
    if (confirmpassword === password) setConPassErrorState(false);
    else setConPassErrorState(true);
  }, [password, confirmpassword]);

  return (
    <div className="Login-container">
      <form
        className="Login-box"
        onSubmit={(e) => SignupHandler(e, firstname, lastname, email, password)}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>Sign </h1>
          <h1 style={{ color: "var(--primary)" }}>UP</h1>
        </div>
        <div className="input-box-text">
          <input
            type="text"
            required
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="input-box-text">
          <input
            type="text"
            required
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="input-box-text">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <p
          style={{
            display: emailErrorState ? "block" : "none",
            color: "red",
            fontWeight: "bold",
          }}
        >
          Enter a valid email
        </p>

        <div className="input-box-password">
          <input
            required
            type={showpasswordState ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passregex.test(e.target.value)) setPassErrorState(false);
              else setPassErrorState(true);
            }}
          />
          <div
            className="password-state"
            onClick={() => setPassState(!showpasswordState)}
          >
            {showpasswordState ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </div>
        </div>
        <p
          style={{
            display: passErrorState ? "block" : "none",
            color: "red",
            fontSize: "14px",
          }}
        >
          Password must be of 8-15 chararters and must contain at least an
          Uppercase letter, a lowercase letter and a number.
        </p>

        <div className="input-box-password">
          <input
            required
            type={showConPasswordState ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div
            className="password-state"
            onClick={() => setConPassState(!showConPasswordState)}
          >
            {showConPasswordState ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </div>
        </div>
        <p
          style={{
            display: conPassErrorState ? "block" : "none",
            color: "red",
            wordBreak: "break-word",
            fontSize: "14px",
          }}
        >
          Password doesn't match
        </p>
        <button
          type="submit"
          className={
            conPassErrorState === false && passErrorState === false
              ? "signup-click-btn"
              : "signup-disabled-btn "
          }
          disabled={conPassErrorState === true || passErrorState === true}
        >
          Sign Up
        </button>
        <p style={{ fontWeight: "bold" }}>
          Already a member?
          <Link to="/login" style={{ textDecoration: "none" }}>
            Log In
          </Link>
        </p>
        <br />
      </form>
    </div>
  );
};
