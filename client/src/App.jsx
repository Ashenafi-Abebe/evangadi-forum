import React, { useEffect, useState, createContext } from "react";
import Landing from "./pages/LandingLayout/LandingLayout";
import Home from "./pages/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "./axiosConfig";
import AskQuestion from "./components/AskQuestion/AskQuestion";
import Answer from "./components/Answer/Answer";
// import Footer from "./components/Footer/Footer";

export const AppState = createContext();

function App() {
  const [user, setuser] = useState({});
  const [question, setQuestion] = useState({});

  // console.log(question);
  console.log(user);

  const token = localStorage.getItem("token");
  // console.log(token)
  const navigate = useNavigate();

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setuser(data);
      // console.log(data)
    } catch (error) {
      navigate("/Login");
      console.log(error.response);
    }
  }

  async function getQuestion() {
    try {
      const { data } = await axios.get("/questions/all-questions", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      // console.log(data)
      setQuestion(data); // Assuming data holds the question value
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  }

  useEffect(() => {
    checkUser();
    getQuestion();
  }, []);

  return (
    <AppState.Provider value={{ user, setuser, question, setQuestion, token }}>
      <Routes>
        <Route path="/Login" element={<Landing />} />

        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<AskQuestion />} />
        <Route path="/answer" element={<Answer />} />
        {/* <Route path="/Footer" element={<Footer />} /> */}
      </Routes>
    </AppState.Provider>
  );
}

export default App;
