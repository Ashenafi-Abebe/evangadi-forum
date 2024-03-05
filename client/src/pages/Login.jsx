import React from "react";
import { useRef } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const Navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (!emailValue || !passwordValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      const { data } = await axios.post("/users/Login", {
        email: emailValue,
        password: passwordValue,
      });
      alert("Login successful.");

      localStorage.setItem("token", data.token);
      // Navigate("/");
      console.log(data);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
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
      {" "}
      <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </div>
      </form>
      <Link to={"/register"}>register</Link>
    </section>
  );
}

export default Login;
