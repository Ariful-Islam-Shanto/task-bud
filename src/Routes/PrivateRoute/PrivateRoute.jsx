import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ThreeCircles, Vortex } from "react-loader-spinner";
import useAuth from "../../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#3b82f6"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (user) {
    return children;
  }
  
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
