import React from "react";
import UserLogin from "./userLogin/UserLogin";
import UserRegister from "./userRegister/UserRegister";

import styles from "./Login.module.css";

const Login = () => {
  return (
    <section className={styles.accountContainer}>
      <div className={styles.sectionWraper}>
        <div className={styles.pageTitle}>
          <h3>Account</h3>
        </div>
        <div className={styles.formWrape}>
          <UserRegister />
          <UserLogin />
        </div>
      </div>
    </section>
  );
};

export default Login;
