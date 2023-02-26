import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../../firebase.init";

const RequireAuth = ({ children }) => {
  // get current user
  const [currentUser, loading] = useAuthState(auth);

  let location = useLocation();

  // handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // if not user logged in
  if (!currentUser?.email) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // else
  return children;
};

export default RequireAuth;
