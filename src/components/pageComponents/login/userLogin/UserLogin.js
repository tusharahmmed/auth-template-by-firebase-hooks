import React, { useEffect } from "react";
import styles from "./UserLogin.module.css";
import { useForm } from "react-hook-form";
import {
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";

import auth from "../../../../firebase.init";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  // if user logged in
  const [currentUser] = useAuthState(auth);

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  // sign in with gmail
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };

  // sign in with email
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  // use form
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    // sign in
    signInWithEmailAndPassword(email, password);
  };

  // check login error
  useEffect(() => {
    if (error) {
      swal({
        text: `${error?.message}`,
        icon: "warning",
        button: "ok",
        dangerMode: true,
      });
    }
  }, [error]);

  return (
    <div className={styles.login}>
      <h4>Already registered?</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="form-control"
            id="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password2" className="form-label">
            Password
          </label>
          <input
            {...register("password", { required: true, minLength: 6 })}
            type="password"
            className="form-control"
            id="password2"
          />
        </div>
        <button type="submit" className="form-submit-btn">
          SIGN IN
        </button>
        <p className={styles.or}>or</p>
      </form>
      <span className={styles.googleBtn}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfRHxg_L_nUjeg7chnbUX-Fu6r_5jSZsWOxw&usqp=CAU"
          alt=""
          onClick={handleGoogleSignIn}
        />
      </span>
    </div>
  );
};

export default UserLogin;
