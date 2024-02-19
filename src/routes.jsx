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
    name :"Consultation",
    path: "/do-a-quick-consultation",
    element: <QuickConsultationPage />,
  },
  {
    path: "/details-consultation/:id", // Ajoutez un paramètre d'ID à la route
    element: <DetailsConsultation />,
  },
];

export default routes;
