import React from "react";
import "./SignupPage.scss";
import { Button } from "@/global-components";
import { SignupForm } from "@/global-components";
import FacebookIcon from "@/assets/images/facebook.svg";
import GoogleIcon from "@/assets/images/google.svg";
import { Link } from "react-router-dom";

export const SignupPage: React.FC = () => {
  return (
    <div className="signup-container">
      <div className="logo">Spotify</div>
      <h1>Sign up for free to start listening</h1>
      <div className="signup-container__buttons">
        <Button
          className="button button--facebook"
          icon={FacebookIcon}
          text="Sign up with Facebook"
        />
        <Button
          className="button button--google"
          icon={GoogleIcon}
          text="Sign up with Google"
        />
      </div>
      <hr />
      <h2>Sign up with your email address</h2>
      <SignupForm />
      <p className="login">
        Have an account?{" "}
        <Link to="/login">
          <span>Log In</span>{" "}
        </Link>
      </p>
    </div>
  );
};
