import React from "react";
import { useRef } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const Navigate = useNavigate();
  const userNameDom = useRef();
  const FirstNameDom = useRef();
  const LastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const firstnameValue = FirstNameDom.current.value;
    const lastnameValue = LastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("Please provide all required information");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });
      alert("Registration successful.please login");
      Navigate("/login");
    } catch (error) {
      alert("something went worng");
      console.error(error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(
          "Registration failed: " + (error.response.data.msg || "Unknown error")
        );
      } else if (error.request) {
        console.log(error.request);
        alert("No response from the server");
      } else {
        console.log("Error", error.message);
        alert("Error: " + error.message);
      }
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Username:</span>
          <input ref={userNameDom} type="text" placeholder="Username" />
        </div>

        <div>
          <span>First name:</span>
          <input ref={FirstNameDom} type="text" placeholder="First name" />
        </div>

        <div>
          <span>Last name:</span>
          <input ref={LastNameDom} type="text" placeholder="Last name" />
        </div>

        <div>
          <span>Email:</span>
          {/* Corrected the pattern attribute for email validation */}
          <input ref={emailDom} type="email" placeholder="Email" />
        </div>

        <div>
          <span>Password:</span>
          <input ref={passwordDom} type="password" placeholder="Password" />
        </div>

        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      <Link to={"/Login"}>Login</Link>
    </section>
  );
}

export default Register;
