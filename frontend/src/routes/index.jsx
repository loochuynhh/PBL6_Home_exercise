import { createBrowserRouter } from 'react-router-dom'
import App from "App"
import { Home } from 'pages/home/Home'
import Workouts from 'pages/workouts/Workouts'
import Exercises from 'pages/exercises/Exercises'
import Product from 'pages/product/Product'
import Login from 'pages/account/Login'
import Signup from 'pages/account/Signup'
import Profile from 'pages/user/Profile'
import Dashboard from 'pages/admin/DashBoard'
import { lazy } from 'react';
import Loadable from 'components/Loadable';
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

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
            },
            {
                path: 'admin',
                element: <Dashboard/>
            },
            {
                path: 'color',
                element: <Color/>
            },
            {
                path: 'typography',
                element: <Typography/>
            },
            {
                path: 'shadow',
                element: <Shadow/>
            }
        ]
    }
])
export default router
