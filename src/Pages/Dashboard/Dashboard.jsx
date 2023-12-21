import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
// import useRole from "../../hooks/useRole";
// import UserMenu from "./Menu/UserMenu/UserMenu";
// import AgentMenu from "./Menu/AgentMenu/AgentMenu";
// import AdminMenu from "./Menu/AdminMenu/AdminMenu";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import useAuth from "../../Hooks/useAuth";
import { FaRegUserCircle } from "react-icons/fa";
import useTodo from "../../Hooks/useTodo";
import { LuList, LuListTodo } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
// import { Helmet } from "react-helmet";

const Dashboard = () => {
  const {user} = useAuth();
  const todos = useTodo();
//   const [role, isLoading] = useRole();
  const [isOpen , setIsOpen] = useState();
//   console.log(role);
  
  return (
    // style={{
    //     background : `url("https://i.postimg.cc/cJTZb0LS/Bannger.png")`
    //    }}

<div className="drawer bg-transparent backdrop-blur-2xl bg-cover">

  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
  <div className=" min-h-screen flex">
      
      <div className="hidden lg:block xl:block lg:w-64 xl:w-40 bg-[#3e1a3b]">
        <h1 className="text-2xl text-gray-300 font-bold text-center">Tech Bud</h1>
        <ul className="menu text-center p-4">
         {/* User menu */}
         {/* {!isLoading && role === 'guest' && <UserMenu/>} */}
            {/* Agent menu */}
         {/* {!isLoading && role === 'agent' && <AgentMenu/>} */}
            {/* Admin menu */}
         {/* {!isLoading && role === 'admin' && <AdminMenu/>} */}
         {/* <NavLink
  to="/dashboard"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "text-white text-center bg-[#D94ACD] rounded-sm" : "text-gray-400 rounded-sm text-center"
  }
>
<li className="flex items-center justify-center w-full"><a className="w-full flex items-center justify-center">Dashboard</a></li>
</NavLink> */}
<NavLink
  to="todo"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "text-white text-center bg-[#D94ACD] rounded-sm" : "text-gray-400 rounded-sm text-center"
  }
>
<li className="flex items-center justify-center w-full">
    
    <a className="w-full flex items-center justify-center"> <LuListTodo/> Todo</a></li>
</NavLink>
<NavLink
  to="createTodo"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "text-white text-center bg-[#D94ACD] rounded-sm" : "text-gray-400 rounded-sm text-center"
  }
>
<li className="flex items-center justify-center w-full"><a className="w-full flex items-center justify-center"><IoMdAddCircleOutline/>Add Todo</a></li>
</NavLink>
         <div className="divider"></div> 
         <NavLink
  to="/"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "text-white text-center bg-[#D94ACD] rounded-sm" : "text-gray-400 rounded-sm text-center"
  }
>
<li className="flex items-center justify-center w-full"><a className="w-full flex items-center justify-center"><FaHome/>Home</a></li>
</NavLink>
        </ul>
      </div>
      <div className="flex-1 px-12 py-6 ">
        <div className="flex bg-transparent backdrop-blur-2xl border-2 border-gray-600 rounded-lg p-4 items-center justify-between">
      <div>
      <p className=" text-gray-600 font-thin">Hello {user && user?.displayName}</p>
        <h1 className="text-4xl font-semibold text-black">You have got {todos && todos.length} task today.</h1>
      </div>
      <div className="flex items-center gap-2">
       {user.photoURL ?  <img src={user?.photoURL || ""}  alt="" />
       :
       <FaRegUserCircle className="text-6xl"/>
       }
     <>
     <h1 className=" font-medium text-gray-700">
              {user?.displayName}
        </h1>
       <p>{user?.occupation ? user?.occupation : " "}</p>
     </>
      </div>
        </div>
        <Outlet />
      </div>
    </div>
    <label htmlFor="my-drawer" className="btn btn-ghost px-5 py-3 drawer-button absolute top-0 block md:block lg:hidden xl:hidden"><GiHamburgerMenu/></label>
  </div> 
  <div className="drawer-side min-h-screen w-full">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay "></label>
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
    <div className=" ">
     <ul className="menu text-center  p-4">
       
        <div className="divider"></div> 
        <li className="text-center">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-[#D94ACD] text-black" : " "
              }
            >
             Home
            </NavLink>
            </li>
       </ul>
    
     </div>
      
    </ul>


  </div>


</div>
  );
};

export default Dashboard;
