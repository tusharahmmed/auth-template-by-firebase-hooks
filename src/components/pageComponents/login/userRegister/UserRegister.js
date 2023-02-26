import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useCreateUserWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import swal from "sweetalert";

import auth from "../../../../firebase.init";
import styles from "./UserRegister.module.css";

const UserRegister = () => {
  const navigate = useNavigate();

  // if user logged in
  const [currentUser] = useAuthState(auth);
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  // create user with email
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // use form
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    // send reqest
    createUserWithEmailAndPassword(email, password);
  };

  // register response

  useEffect(() => {
    // if error
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
    <div className={styles.register}>
      <h4>New here?</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="register-email" className="form-label">
            Email
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="form-control"
            id="register-email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            {...register("password", { required: true, minLength: 6 })}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="form-submit-btn">
          CREATE AN ACCOUNT
        </button>
      </form>
    </div>
  );
};

export default UserRegister;
