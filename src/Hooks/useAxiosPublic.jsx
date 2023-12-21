import axios from 'axios';
import React from 'react';

const instance = axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL : 'https://task-bud-server.vercel.app'
  });

const useAxiosPublic = () => {
    return instance;
};

export default useAxiosPublic;