import React from "react";
import "./LoginPage.scss";
import { Button } from "@/global-components";
import { LoginForm } from "@/global-components";
import FacebookIcon from "@/assets/images/facebook.svg";
import GoogleIcon from "@/assets/images/google.svg";
import AppleIcon from "@/assets/images/apple.svg";
import { Link } from "react-router-dom";

export const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <div className="logo">Spotify</div>
      <p className="login-container__title">
        Please sign in to Spotify to continue
      </p>
      <div className="login-container__buttons">
        <Button
          className="button button--facebook"
          icon={FacebookIcon}
          text="Sign up with Facebook"
        />
        <Button
          className="button button--apple"
          icon={AppleIcon}
          text="Sign up with Apple"
        />
        <Button
          className="button button--google"
          icon={GoogleIcon}
          text="Sign up with Google"
        />
      </div>
      <hr className="hr hr--with-text" />
      <LoginForm />
      <hr className="hr" />
      <h2>You don&apos;t have an account yet?</h2>
      <Link to="/signup">
        <Button
          className="button button-for-signup"
          text="Sign up for Spotify"
        />
      </Link>
    </div>
  );
};
