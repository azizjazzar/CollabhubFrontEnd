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
           {!isMeeting && (
    <div className="fixed bottom-[100px] right-8">
    <button className="rounded-full bg-blue-500 p-2" >
      <svg className="h-11 w-11 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15l9-5-9-5-9 5 9 5zm0 0v6m0 0l3-3m-3 3l-3-3" />
      </svg>
    </button>
  </div>
    
          )}
          
        </AuthProvider>
      </ChatProvider>
    </>
  );
  
}

export default App;
