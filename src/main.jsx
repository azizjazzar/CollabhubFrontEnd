/**
=========================================================
* Material Tailwind Kit React - v2.1.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-tailwind-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-tailwind-dashboard-react/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "@material-tailwind/react";
import "../public/css/tailwind.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Collaboration, Home, Profile, SignIn, SignUp } from "./pages";
import BuyProject from "./Components/GServices/buyProject";
import QuickConsultationPage from "./Components/Consultations/QuickConsultationPage";
import BlogList from "./Components/Blog/BlogList";
import ServiceDetails from "./Components/GServices/serviceDetails";
import DetailsConsultation from "./Components/Consultations/DetailsConsultation";
import BlogDetails from "./Components/Blog/BlogDetails";



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
        name: "Find Talent",
        path: "/consultation",
        element: <Profile />,
      
      },
      {  
      path: "/buyProject",
      element: <BuyProject />,},
    
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);