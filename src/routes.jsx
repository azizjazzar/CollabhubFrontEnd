import { Home, Profile, SignIn, SignUp , Collaboration} from "@/pages";
import Forum from "./widgets/blog/forum";




export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },

  {
    name: "Find Talent",
    path: "/consultation",
    element: <Profile />,
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
    path: "/forum",
    element: <Forum />,
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



];

export default routes;
