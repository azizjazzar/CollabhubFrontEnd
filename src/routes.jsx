import { Home, Profile, SignIn, SignUp , Collaboration } from "@/pages";
import QuickConsultationPage from "@/Components/Consultations/QuickConsultationPage";
import DetailsConsultation from "@/Components/Consultations/DetailsConsultation";

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
   
    path: "/do-a-quick-consultation",
    element: <QuickConsultationPage />, // Utilisez votre page QuickConsultationPage ici
  },

  {
  
    path: "/details-consultation", // Le chemin que vous voulez pour la page de consultation
    element: <DetailsConsultation />,
  },



];

export default routes;
