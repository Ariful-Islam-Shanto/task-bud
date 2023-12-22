import React from "react";
import Container from "../../../Components/Container/Container";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const Banner = () => {
  const {user} = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-transparent">
      {/* <div className="   bg-[#f8f7f3]"> */}
      <Container>
        <div className="flex flex-col-reverse md:flex-row items-center min-h-[calc(100vh-50px)] justify-center">
          <div className="flex-1 text-center md:text-left space-y-6">
            <h1 className="text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-bold text-black">
              Simplify Your Tasks, Amplify Your Productivity.
            </h1>
            <p className="text-neutral-600 text-md md:text-xs lg:text-lg font-medium">
              TaskBud streamlines your tasks for maximum efficiency. Experience
              a simplified approach to productivity with our user-friendly
              platform. Achieve more with less effort – your go-to solution for
              efficient task management.
            </p>
            <button onClick={() => {
                if(user) {
                  navigate('dashboard/todo')
                }else{
                  navigate('/login')
                }
            }} className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 px-5 py-3 rounded-lg border-none text-gray-300 font-medium">
               Let's Explore
            </button>
          </div>
          <div className="flex-1">
            <img
              src="https://i.postimg.cc/cCCzTtFp/bannger-illustration.png"
              alt=""
              className="h-full object-cover"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
