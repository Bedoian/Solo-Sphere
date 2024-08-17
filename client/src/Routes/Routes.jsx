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
                element:<JobDetails></JobDetails>,
                loader:({params})=>fetch(`http://localhost:9000/job/${params.id}`)
            },
            {
                path:'/addJob',
                element:<AddJob></AddJob>
            },
            {
                path:'/postedJob',
                element:<MyPostedJobs/>
            },
            {
                path:'/mybids',
                element:<MyBids/>
            },
            {
                path:'/bidReq',
                element:<BidRequests/>
            },
            {
                path:'/update/:id',
                element:<UpdateJob/>,
                loader:({params})=>fetch(`http://localhost:9000/job/${params.id}`)
            }
        ]
    },
]);

export default router