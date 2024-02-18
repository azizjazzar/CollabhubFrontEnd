import { Home, Profile, SignIn, SignUp , Collaboration } from "@/pages";
import BuyProject from "@/pages/buyProject";
import ProjectDetails from "@/pages/projectDetails";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },

  {
    name: "Find Talent",
    path: "/consultation",
    element: <Profile />,//changer ici  votre page
  },

  {
    name: "Find Work",
    path: "/consultation",
    element: <Profile />,
  },

  {
    name: "Collaboration",
    path: "/collaboration",
    element: <Collaboration/>,
  },
  

  {
    name: "About Us",
    path: "/sign-up",
    element: <SignUp />,
  },

  {
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "Sign Up",
    path: "/sign-up",
    element: <SignUp />,
  },

  {
    path: "/buyProject",
    element: <BuyProject />,
  },


  {
    path: "/projectDetails/:projectId",
    element: <ProjectDetails />,
  },

];

export default routes;
