
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import "../public/css/tailwind.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Collaboration, FreelancerCollab, Home, Profile, SignIn, SignUp } from "./pages";
import BuyProject from "./Components/GServices/buyProject";
import QuickConsultationPage from "./Components/Consultations/QuickConsultationPage";
import BlogList from "./Components/Blog/BlogList";
import ServiceDetails from "./Components/GServices/serviceDetails";
import CheckoutService from "./Components/GServices/checkoutService";
import PostWorkPage from "./Components/GServices/postWorkPage";
import MyRequests from "./Components/GServices/myRequests";
import DetailsConsultation from "./Components/Consultations/DetailsConsultation";
import BlogDetails from "./Components/Blog/BlogDetails";
import ProjectPage from "./Components/Projet/ProjectPage";
import ProjectDetail from "./Components/Projet/ProjectDetail";
import UploadJob from "./Components/Projet/UploadJob";
import WelcomePage from "./Components/Authentification/WelcomePage";
import Alan from "./Components/Authentification/Alan";
import VideoRoomAi from "./Components/Collaboration/VideoRoomAi";
import { SuggestionComponent} from "./widgets/layout/SuggestionComponent";
import Video from "./Components/Collaboration/video";
import ChatPages from "./Components/Chat/Chat/ChatPages";
import EndMeetingPage from "./Components/Consultations/Metting/IA/EndMeetingPage";
import PaymentSuccess from "./Components/Consultations/Metting/PaymentSucces";
import { UsersSatistique } from "./BackOffice/src/components/usersSatistique";
import Layout from "./BackOffice/src/components/shared/Layout";
import Dashboard from "./BackOffice/src/pages/Dashboard";
import { VideoRoom } from "./Components/Consultations/VideoRoom";
import JobApllicationsOffers from "./Components/Projet/JobApllicationsOffers";
import JobsBackOffice from "./BackOffice/src/pages/JobsBackOffice";



const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>, 
    children:[
      {
      path:"/",
      element: <Home/>
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
          },

           {
            path: "jobsBackOffice", 
            element: <JobsBackOffice />
          }
          
        ]
      },
      {
        name: "Find Talent",
        path: "/consultation",
        element: <Profile />,
      
      },
      {  
      path: "/buyProject",
      element: <BuyProject />,},
    
      {
        
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        
        path: "/profile",
        element: <Profile />,
      },
      {
        name: "Collaboration",
        path: "/collaboration",
        element: <Collaboration/>,
      },
      {
        name: "Freelancercollab",
        path: "/freelancercollab/:projectId/:userId",
        element: <FreelancerCollab/>,
      },
    
      {
        
        path: "/do-a-quick-consultation",
        element: <QuickConsultationPage />,
      },
      {
        name: "Blog",
        path: "/blog",
        element: <BlogList />}, 
    
    
      {
        path: "/serviceDetails/:serviceId",
        element: <ServiceDetails />,
    
      },
      {
        path: "/checkout-service/:serviceId",
        element: <CheckoutService />
      },
      {
        path: "/postWork/:serviceId",
        element: <PostWorkPage />
      },
      {
        path: "/myRequests/:serviceId",
        element: <MyRequests />
      },
      {
      
        path: "/sign-in",
        element: <SignIn/>,
      },
      {
       
        path: "/sign-up",
        element: <SignUp />,
      },
    
      {
        path: "/details-consultation/:id", // Ajoutez un paramètre d'ID à la route
        element: <DetailsConsultation />,
      },
    
      {
        path: "/blog/:id",  // Ajoutez la route pour les détails du blog
        element: <BlogDetails />,
      },

       {
        path:"jobs",
        element: <ProjectPage/>
      },
      {
        path:"/projects/:projectId",
        element: <ProjectDetail/>
      },

      {
        path:"/addproject",
        element: <UploadJob/>
      },
      // {
      //   path:"/chat",
      //   element: <ChatApplication/>
      // },
      {
        path:"/welcome",
        element: <WelcomePage/>
      },
      {
        path:"/alan",
        element: <Alan/>
      },
    

      {

        path:"/meeting/:meeting",
        element: <VideoRoomAi/>
      },
      
      {
        path:"/meeting",
        element: <VideoRoom/>

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
      {
        path: "/end-meeting",
        element: <EndMeetingPage />
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />
      },

      {
        path: "/apllication",
        element: <JobApllicationsOffers />
      },
      

      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(

    <RouterProvider router={router} />
    
);