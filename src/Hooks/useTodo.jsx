import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const useTodo = () => {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const {data : todos, isLoading, refetch} = useQuery({
        enabled : !!user?.email,
        queryKey : ['todo'],
        queryFn : async () => {
            const { data } = await axiosPublic.get(`/todo?email=${user?.email}`)
            return data;
        }
    })
    return {todos, refetch};
};

export default useTodo;