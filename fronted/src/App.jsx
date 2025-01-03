import { useEffect, useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Singup from './components/Singup';

function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token") ? true : false

  useEffect(() => {
   if (token) {
    navigate("/");
   }else{
    navigate("/login");
   }
  }, []);
  

  return (
    <>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/" element={<Dashboard />} />
    </Routes>
    </>
  )
}

export default App
