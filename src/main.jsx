import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import "../public/css/tailwind.css";
import {
  Collaboration,
  FreelancerCollab,
  Home,
  Profile,
  SignIn,
  SignUp
} from "./pages";
import BuyProject from "./Components/GServices/buyProject";
import QuickConsultationPage from "./Components/Consultations/QuickConsultationPage";
import BlogList from "./Components/Blog/BlogList";
import ServiceDetails from "./Components/GServices/serviceDetails";
import DetailsConsultation from "./Components/Consultations/DetailsConsultation";
import BlogDetails from "./Components/Blog/BlogDetails";
import ProjectPage from "./Components/Projet/ProjectPage";
import ProjectDetail from "./Components/Projet/ProjectDetail";
import UploadJob from "./Components/Projet/UploadJob";
import WelcomePage from "./Components/Authentification/WelcomePage";
import Alan from "./Components/Authentification/Alan";
import { VideoRoom } from "./Components/Consultations/Metting/VideoRoom";
import ChatGPT from "./Components/Consultations/Metting/IA/Chatgpt";
import Gemini from "./Components/Consultations/Metting/IA/Gemini";
import PaymentSuccess from "./Components/Consultations/Metting/PaymentSucces";
import Dashboard from "./BackOffice/src/pages/Dashboard";
import Layout from "./BackOffice/src/components/shared/Layout";
import { UsersSatistique } from "./BackOffice/src/components/usersSatistique";
import { SuggestionComponent} from "./widgets/layout/SuggestionComponent";
import Video from "./Components/Collaboration/video";
import ChatPages from "./Components/Chat/Chat/ChatPages";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        name: "Find Talent",
        path: "/consultation",
        element: <Profile />
      },
      {
        path: "/dashboard",
        element: <Layout />,
        children: [
          {
            path: "", 
            element: <Dashboard />
          },
          {
            path: "usersSatistique", 
            element: <UsersSatistique />
          }
        ]
      },
      {
        path: "/profile/:id",
        element: <Profile />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/bard",
        element: <Gemini />
      },
      {
        name: "Collaboration",
        path: "/collaboration",
        element: <Collaboration />
      },
      {
        name: "Freelancercollab",
        path: "/freelancercollab/:projectId",
        element: <FreelancerCollab />
      },
      {
        path: "/do-a-quick-consultation",
        element: <QuickConsultationPage />
      },
      {
        name: "Blog",
        path: "/blog",
        element: <BlogList />
      },
      {
        path: "/serviceDetails/:serviceId",
        element: <ServiceDetails />
      },
      {
        path: "/sign-in",
        element: <SignIn />
      },
      {
        path: "/sign-up",
        element: <SignUp />
      },
      {
        path: "/details-consultation/:id",
        element: <DetailsConsultation />
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />
      },
      {
        path: "/buyProject",
        element: <BuyProject />
      },
      {
        path: "jobs",
        element: <ProjectPage />
      },
      {
        path: "/projects/:projectId",
        element: <ProjectDetail />
      },
      {
        path:"/suggestion/:subject/:meetingId",
        element: <SuggestionComponent/>
      },
      {
        path:"/video",
        element: <Video/>
      },

         {
        path:"/messagerie",
        element: <ChatPages/>
      },
         
      {
        path:"/addproject",
        element: <UploadJob/>
      },
 
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(

    <RouterProvider router={router} />
    
);
