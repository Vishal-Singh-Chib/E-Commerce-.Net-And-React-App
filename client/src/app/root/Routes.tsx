import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import { LoginPage } from "../../features/login/LoginPage";
import { Post } from "../../features/post/Post";

export const router =createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'',element:<LoginPage/>
            },
            {
                path:'/login',element:<LoginPage/>
            },
             {
                path:'/post',element:<Post/>
            },
             {
                path:'/about',element:<AboutPage/>
            },
             {
                path:'/contact',element:<ContactPage/>
            },
        ]
    }
])