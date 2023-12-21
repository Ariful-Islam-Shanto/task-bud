import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Dashboard from '../Pages/Dashboard/Dashboard';
import CreateTodo from '../Pages/Dashboard/CreateTodo/CreateTodo';

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
    },
    {
        path : 'dashboard',
        element : <Dashboard/>,
        children : [
            {
                path : "createTodo",
                element : <CreateTodo/>
            }
        ]
    }
])

export default routes;