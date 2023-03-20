import React from "react";
import "./LoginForm.scss";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useState, useEffect } from "react";
import { useAuth } from "@/modules/AppModule/services/AuthContext";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const { login, setSessionPersistence } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const navigation = useNavigate();

  const handleCredentialChange = (fieldName: string, value: string) => {
    setFields({ ...fields, [fieldName]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setLoginError("");
      rememberMe
        ? await setSessionPersistence(true)
        : await setSessionPersistence(false);
      await login(fields["email"], fields["password"]);
      navigation("/");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setLoginError(err.message);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setLoginError("");
  }, [fields]);

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div className="login-form__text-input">
        <Input
          type="text"
          id="email"
          label="Email address or username"
          placeholder="Email address or username"
          value={fields["email"]}
          onChange={handleCredentialChange}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          placeholder="Password"
          value={fields["password"]}
          onChange={handleCredentialChange}
        />
      </div>
      {loginError && (
        <div className="login-form__login-error">{loginError}</div>
      )}
      <p className="password-remainder">Do not you remember the password?</p>
      <div className="login-form__summary">
        <div className="summary__checkbox">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="remember">Remember me</label>
        </div>
        <Button
          disabled={isLoading}
          className="button button--login"
          text="Log In"
        />
      </div>
    </form>
  );
};
