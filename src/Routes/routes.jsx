import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Dashboard from '../Pages/Dashboard/Dashboard';
import CreateTodo from '../Pages/Dashboard/CreateTodo/CreateTodo';
import ManageTask from '../Pages/Dashboard/DND/ManageTask';
import AboutUs from '../Pages/About Us/AboutUs';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const routes = createBrowserRouter([
    {
        path : '/',
        element : <Layout/>,
        children : [
            {
                path : '/',
                element : <Home/>
            },
            {
                path : '/login',
                element : <Login/>
            },
            {
                path : '/register',
                element : <Register/>
            },
            {
                path : '/about',
                element : <AboutUs/>
            }
        ]
    },
    {
        path : 'dashboard',
        element : <PrivateRoute> <Dashboard/></PrivateRoute>,
        children : [
            {
                path : "createTodo",
                element : <PrivateRoute><CreateTodo/></PrivateRoute>
            },
            {
                path : "todo",
                element : <PrivateRoute><ManageTask/></PrivateRoute>
            }
        ]
    }
])

export default routes;