import React from "react";
import styles from "./Dashboard.module.css";

import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  // get current user
  const [currentUser] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  // handle Logout
  const handleLogout = async () => {
    const success = await signOut();
    if (success) {
      <Navigate to="/" replace />;
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.homeBox}>
        <h2>User Details</h2>
        <h6>Email: {currentUser.email}</h6>
        <button onClick={handleLogout} className="form-submit-btn">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
