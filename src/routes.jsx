import { Home, Profile, SignIn, SignUp } from "@/pages";

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
    name: "Why CollabHub",
    path: "/sign-up",
    element: <SignUp />,
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



];

export default routes;
