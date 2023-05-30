import React, { useRef } from "react";
import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("/auth/register", user);
        navigate("/login")
      } catch (err){
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MySocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="text"
              required
              ref={username}
              placeholder="Username"
              name=""
              id=""
              className="loginInput"
            />
            <input
              type="email"
              required
              ref={email}
              placeholder="Email"
              name=""
              id=""
              className="loginInput"
            />
            <input
              required
              type="password"
              ref={password}
              placeholder="Password "
              name=""
              id=""
              className="loginInput"
              minLength={6}
            />
            <input
              type="password"
              required
              ref={passwordAgain}
              placeholder="Password Again"
              name=""
              id=""
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Sign up
            </button>
            
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            <button className="loginRegisterButton"> Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
