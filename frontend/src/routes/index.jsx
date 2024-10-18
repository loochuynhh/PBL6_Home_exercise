import { createBrowserRouter } from 'react-router-dom'
import App from "App"
import { Home } from 'pages/home/Home'
import Workouts from 'pages/workouts/Workouts'
import Exercises from 'pages/exercises/Exercises'
import Product from 'pages/product/Product'
import Login from 'pages/account/Login'
import Signup from 'pages/account/Signup'
import Profile from 'pages/user/Profile'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "product",
                element: <Product/>
            },
            {
                path: "workouts",
                element: <Workouts/>
            },
            {
                path: "exercises",
                element: <Exercises/>
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'signup',
                element: <Signup/>
            },
            {
                path: 'profile',
                element: <Profile/>
            }
        ]
    }
])
export default router
