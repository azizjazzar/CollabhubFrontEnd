import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

import './App.css'
import Navbar from "./Components/Navbar/Navbar";
import { AuthProvider } from "./pages/authContext";
import Alan from "./Components/Authentification/Alan";
import Chatbot from "./Components/Blog/ChatBot";
function App() {
  const routes = [
    { name: 'Home', path: '/' },
    { name: 'Find Project', path: '/jobs' },
    { name: 'Collaboration', path: '/collaboration' },
    { name: 'Consultation', path: '/do-a-quick-consultation' },
    { name: 'Service', path: '/buyProject' },
    { name: 'Blog', path: '/blog' },
    { name: 'sign in', path: '/sign-in' },
    { name: 'sign up', path: '/sign-up' },
  ];

  const location = useLocation();

  // Vérifiez si l'emplacement actuel est '/dashboard' ou '/dashboard/usersSatistique'
  const isDashboard = location.pathname.startsWith('/dashboard');
  
  return (
    <>
      <AuthProvider>
        {!isDashboard && <Navbar routes={routes} />}
     
        <Outlet />
        <div className="fixed  bottom-5 left-5">
        <Alan ></Alan>
        </div>
        <div className="fixed  bottom-5 right-5">
        <Chatbot ></Chatbot>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
