import React, { useRef } from "react";
import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const passWordError = useRef();
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();

  // const handleClick = async (e) => {
  //   e.preventDefault();

  //   if (passwordAgain.current.value !== password.current.value) {
  //     passwordAgain.current.setCustomValidity("Passwords don't match!");
  //     passwordAgain.current.value = "";
  //     password.current.value = "";
  //   } else {
  //     const user = {
  //       username: username.current.value,
  //       email: email.current.value,
  //       password: password.current.value,
  //     };

  //     try {
  //       await axios.post("/auth/register", user);
  //       navigate("/login");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  const handleRegistration = async (data) => {
    console.log(data);
    const { username, email, password } = data;
    const user = {
      username,
      email,
      password,
    };

    try {
      await axios.post("/auth/register", user);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleErrors = (err) => {
    const { passwordAgain } = err;

    if (passwordAgain) {
      passWordError.current.style.display = "block";
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
          <form
            className="loginBox"
            onSubmit={handleSubmit(handleRegistration, handleErrors)}
          >
            <input
              type="text"
              required
              ref={username}
              placeholder="Username"
              name="username"
              {...register("username")}
              id=""
              className="loginInput"
            />
            <input
              type="email"
              required
              ref={email}
              placeholder="Email"
              name="email"
              {...register("email")}
              id=""
              className="loginInput"
            />
            <input
              required
              type="password"
              ref={password}
              placeholder="Password "
              name="password"
              {...register("password")}
              id=""
              className="loginInput"
              minLength={6}
            />
            <input
              type="password"
              required
              ref={passwordAgain}
              placeholder="Password Again"
              name="passwordAgain"
              {...register("passwordAgain", {
                validate: (val) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
              id=""
              className="loginInput"
            />
            <span
              ref={passWordError}
              style={{
                margin: ".5em 0",
                color: "red",
                fontSize: ".9rem",
                display: "none",
              }}
            >
              Password don't match
            </span>
            <button className="loginButton">Sign up</button>

            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              <button className="loginRegisterButton"> Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
