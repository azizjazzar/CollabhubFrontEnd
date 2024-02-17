import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import './App.css'

function App() {
  const routes = [
    { name: 'Home', path: '/' },
    { name: 'Dhia', path: '/jobs' },
    { name: 'Adem', path: '/jobs' },
    { name: 'Idriss', path: '/blog' },
    { name: 'Tmimi', path: '/about' },
    { name: 'sign in', path: '/login' },
    { name: 'sign up', path: '/sign-up' },
    
  ];
  return (
    <>
      <Navbar routes={routes} />
      <Outlet />
    </>
  );
}
export default App;
