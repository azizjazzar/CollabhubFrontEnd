import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

import './App.css'
import Navbar from "./Components/Navbar/Navbar";
import { AuthProvider } from "./pages/authContext";
import Alan from "./Components/Authentification/Alan";
import Chatbot from "./Components/Blog/ChatBot";
import ChatProvider from "./Context/ChatProvider";
import ChatPages from "./Components/Chat/Chat/ChatPages";
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
  const isMeeting = location.pathname.startsWith('/meeting');
  
  return (
    <>
      <ChatProvider>
        <AuthProvider>
          {!isDashboard && <Navbar routes={routes} />}
       
          <Outlet />
         
          {!isMeeting && (
            <div className="fixed bottom-5 right-5">
              <Chatbot />
            </div>
          )}
  
          {!isMeeting && (
            <div className="fixed bottom-5 left-5">
              <Alan />
            </div>
          )}
         
          
        </AuthProvider>
      </ChatProvider>
    </>
  );
  
}

export default App;
