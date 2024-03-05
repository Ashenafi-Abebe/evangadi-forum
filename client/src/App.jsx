import { useEffect, useState, createContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "./axiosConfig";

export const AppState = createContext();

function App() {
  const [user, setuser] = useState({});

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setuser(data);
    } catch (error) {
      console.log(error.respones);
      navigate("/Login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setuser }}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="Login" element={<Login />}></Route>
        <Route path="Register" element={<Register />}></Route>
      </Routes>
    </AppState.Provider>
  );
}

export default App;
