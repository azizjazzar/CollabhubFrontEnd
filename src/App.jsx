<<<<<<< HEAD
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
=======
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/index";
import routes from "@/routes";

import { FreelancerCollab, ProjectCollab } from "./pages";

>>>>>>> 17f4f3a04738b468df80b464a900c6a7aefd3446

import './App.css'
import Navbar from "./Components/Navbar/Navbar";
import { AuthProvider } from "./pages/authContext";

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
  return (
    <>
<<<<<<< HEAD
    <AuthProvider>
    <Navbar routes={routes} />
      <Outlet />
    </AuthProvider>
     
=======
      {!(pathname == '/sign-in' || pathname == '/sign-up') && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
        </div>
      )
      }
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/freelancer_collab" element={<FreelancerCollab/>} />

        <Route path="/projectcollab" element={<ProjectCollab/>} />

      </Routes>
>>>>>>> 17f4f3a04738b468df80b464a900c6a7aefd3446
    </>
  );
}
export default App;