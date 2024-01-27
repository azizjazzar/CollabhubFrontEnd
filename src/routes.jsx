import React from "react";
import { Home, Profile, SignIn, SignUp } from "@/pages";
import QuickConsultationPage from "@/pages/QuickConsultationPage"; // Importez votre page QuickConsultationPage

export const routes = [
  {
    name: "Home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "Find Talent",
    path: "/find-talent", // Modifiez le chemin pour "Find Talent"
    element: <Profile />,
  },
  {
    name: "Find Work",
    path: "/find-work", // Modifiez le chemin pour "Find Work"
    element: <Profile />,
  },
  {
    name: "Why CollabHub",
    path: "/why-collabhub", // Modifiez le chemin pour "Why CollabHub"
    element: <SignUp />,
  },
  {
    name: "About Us",
    path: "/about-us",
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
    name: "Do a Quick Consultation",
    path: "/do-a-quick-consultation",
    element: <QuickConsultationPage />, // Utilisez votre page QuickConsultationPage ici
  },
];

export default routes;
