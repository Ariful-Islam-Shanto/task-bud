import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';

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
            }
        ]
    }
])

export default routes;