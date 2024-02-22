import { Home, Profile, SignIn, SignUp , Collaboration } from "@/pages";
import QuickConsultationPage from "@/Components/Consultations/QuickConsultationPage";
import DetailsConsultation from "@/Components/Consultations/DetailsConsultation";
import BlogList from "./Components/Blog/BlogList";
import BlogDetails from "./Components/Blog/BlogDetails";
import BuyProject from "@/Components/GServices/buyProject";
import ServiceDetails from "@/Components/GServices/serviceDetails";



export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  
  {  name: "Services",
  path: "/buyProject",
  element: <BuyProject />,},


  {
    name: "Collaboration",
    path: "/collaboration",
    element: <Collaboration/>,
  },

  {
    name :"Consultation",
    path: "/do-a-quick-consultation",
    element: <QuickConsultationPage />,
  },
  {
    name: "Blog",
    path: "/blog",
    element: <BlogList />
  }, 

  {
    name :"Consultation",
    path: "/do-a-quick-consultation",
    element: <QuickConsultationPage />,
  },

  {
    path: "/serviceDetails/:serviceId",
    element: <ServiceDetails />,

  },
  {
    name: "sign in",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "sign up",
    path: "/sign-up",
    element: <SignUp />,
  },

  {
    path: "/details-consultation/:id",
    element: <DetailsConsultation />,
  },

  {
    path: "/blog/:id",
    element: <BlogDetails />,
  },

];

export default routes;
