import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/index";
import routes from "@/routes";
import { AuthProvider } from "./pages/authContext";
import { FreelancerCollab, ProjectCollab } from "./pages";
import BlogList from "./Components/Blog/BlogList";
import BlogDetails from "./Components/Blog/BlogDetails";





function App() {
  const { pathname } = useLocation();

  return (
    <AuthProvider>
      <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
        <Navbar routes={routes} />
      </div>
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />

        <Route path="/freelancer_collab" element={<FreelancerCollab/>} />

        <Route path="/projectcollab" element={<ProjectCollab/>} />
        <Route path="/BlogList" element={<BlogList/>} />
        <Route path="/BlogDetails" element={<BlogDetails/>} />

      </Routes>
    </AuthProvider>
  );
}

export default App;
