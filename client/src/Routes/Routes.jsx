import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import JobDetails from "../Pages/JobDetails";
import AddJob from "../Pages/AddJob";
import MyPostedJobs from "../Pages/MyPostedJob";
import MyBids from "../Pages/Mybids";
import BidRequests from "../Pages/BidRequests";
import UpdateJob from "../Pages/UpdateJob";
import PrivetRoute from "./PrivetRoute";
import AllJobs from "../Pages/AllJobs";
const router = createBrowserRouter([
    {
        path: "/",
        element:<Main></Main>,
        children:[
            {
                index:true,
                element:<Home></Home>,
               
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/job/:id',
                element:<PrivetRoute><JobDetails/></PrivetRoute>,
                loader:({params})=>fetch(`https://solospehre-new.vercel.app/job/${params.id}`)
            },
            {
                path:'/addJob',
                element:<PrivetRoute><AddJob/></PrivetRoute> 
            },
            {
                path:'/postedJob',
                element:<PrivetRoute><MyPostedJobs/></PrivetRoute>
            },
            {
                path:'/mybids',
                element:<PrivetRoute><MyBids/></PrivetRoute>,
            },
            {
                path:'/bidReq',
                element:<PrivetRoute> <BidRequests/></PrivetRoute>
            },
            {
                path:'/update/:id',
                element:<UpdateJob/>,
                loader:({params})=>fetch(`https://solospehre-new.vercel.app/job/${params.id}`)
            },
            {
                path:'/alljobs',
                element:<AllJobs></AllJobs>
            }
        ]
    },
]);

export default router