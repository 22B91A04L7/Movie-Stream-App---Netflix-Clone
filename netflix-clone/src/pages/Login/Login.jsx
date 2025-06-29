import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { login, signup } from "../../Firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");

  // Storing current user details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); //for showing password

  // Loading animation state

  const [Loading, setLoading] = useState(false);

  //  User Authentication
  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  };

  return Loading ? (
    <div className="loading-logo">
      <img src={netflix_spinner} alt="loading logo" />
    </div>
  ) : (
    <div className="login">
      <img src={logo} className="login-logo" alt="" />
      <div className="login-form">
        <h2>{signState}</h2>
        <form>
          {signState === "Sign Up" ? (
            <input
              type="text"
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>
          <button type="submit" onClick={user_auth}>
            {signState}
          </button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p
              onClick={() => {
                setSignState("Sign Up");
              }}
            >
              New to Netflix? <span>Sign Up Now</span>
            </p>
          ) : (
            <></>
          )}
          {signState === "Sign Up" ? (
            <p
              onClick={() => {
                setSignState("Sign In");
              }}
            >
              Already have an Account ?<span>Sign In Now</span>
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
