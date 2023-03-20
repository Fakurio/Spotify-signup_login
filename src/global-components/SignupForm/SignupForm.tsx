import React from "react";
import { useState, useEffect } from "react";
import "./SignupForm.scss";
import { Input } from "../Input/Input";
import { BirthInput } from "../BirthInput/BirthInput";
import { GenderInput } from "../GenderInput/GenderInput";
import { Tos } from "../Tos/Tos";
import { Button } from "../Button/Button";
import ErrorIcon from "@/assets/images/error.svg";
import { FormFields } from "@/modules/AppModule/types/FormFields";
import { useAuth } from "@/modules/AppModule/services/AuthContext";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
const passwordRegex = new RegExp(
  "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"
);

export const SignupForm: React.FC = () => {
  const [fields, setFields] = useState<FormFields>({
    email: "",
    confirm_email: "",
    password: "",
    profile_name: "",
    day_of_birth: "",
    month_of_birth: "Month",
    year_of_birth: "",
    gender: "",
    tos: false,
  });
  const [errors, setErrors] = useState<FormFields>({
    email: "",
    confirm_email: "",
    password: "",
    profile_name: "",
    day_of_birth: "",
    month_of_birth: "",
    year_of_birth: "",
    gender: "",
    tos: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signupError, setSignupError] = useState<string>("");
  const { signup } = useAuth();
  const navigation = useNavigate();

  const handleTextInputChange = (fieldName: string, value: string) => {
    setFields({ ...fields, [fieldName]: value });
  };

  const handleDateInputChange = (fieldName: string, value: string) => {
    if (fieldName === "month_of_birth") {
      setFields({ ...fields, [fieldName]: value });
      return;
    }

    if (isNaN(parseInt(value))) {
      setFields({ ...fields, [fieldName]: "" });
      return;
    }

    const number = parseInt(value);
    if (fieldName === "year_of_birth") {
      const currentYear = new Date().getFullYear();
      setFields({
        ...fields,
        [fieldName]:
          number > currentYear ? currentYear.toString() : number.toString(),
      });
    } else if (fieldName === "day_of_birth") {
      const now = new Date();
      const daysOfCurrentMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).getDate();
      setFields({
        ...fields,
        [fieldName]:
          number > daysOfCurrentMonth
            ? daysOfCurrentMonth.toString()
            : number.toString(),
      });
    }
  };

  const handleGenderInputChange = (value: string) => {
    setFields({ ...fields, gender: value });
  };

  const handleTosChange = (value: boolean) => {
    setFields({ ...fields, tos: value });
  };

  const validateFormFields = () => {
    let emailError = "";
    let confirmEmailError = "";
    let passwordError = "";
    let profileNameError = "";
    let dayOfBirthError = "";
    let monthOfBirthError = "";
    let yearOfBirthError = "";
    let genderError = "";
    let tosError = false;
    let isFormValid = true;

    if (!fields["email"]) {
      emailError = "Cannot be empty";
      isFormValid = false;
    } else if (!fields["email"].match(emailRegex)) {
      emailError = "Email is not valid";
      isFormValid = false;
    }

    if (!fields["confirm_email"]) {
      confirmEmailError = "Cannot be empty";
      isFormValid = false;
    } else if (fields["confirm_email"] !== fields["email"]) {
      confirmEmailError = "Emails do not match";
      isFormValid = false;
    }

    if (!fields["password"]) {
      passwordError = "Cannot be empty";
      isFormValid = false;
    } else if (!fields["password"].match(passwordRegex)) {
      passwordError = `Password has to have at least 8 characters and contain uppercase letters, lowercase letters and numbers`;
      isFormValid = false;
    }

    if (!fields["profile_name"]) {
      profileNameError = "Cannot be empty";
      isFormValid = false;
    }

    if (!fields["day_of_birth"]) {
      dayOfBirthError = "Cannot be empty";
      isFormValid = false;
    }

    if (fields["month_of_birth"] === "Month") {
      monthOfBirthError = "Cannot be empty";
      isFormValid = false;
    }

    if (!fields["year_of_birth"]) {
      yearOfBirthError = "Cannot be empty";
      isFormValid = false;
    } else if (parseInt(fields["year_of_birth"]) < 1870) {
      yearOfBirthError = "You cannot be that old";
      isFormValid = false;
    }

    if (!fields["gender"]) {
      genderError = "Cannot be empty";
      isFormValid = false;
    }

    if (!fields["tos"]) {
      tosError = true;
      isFormValid = false;
    }

    setErrors({
      ...errors,
      email: emailError,
      confirm_email: confirmEmailError,
      password: passwordError,
      profile_name: profileNameError,
      year_of_birth: yearOfBirthError,
      day_of_birth: dayOfBirthError,
      month_of_birth: monthOfBirthError,
      gender: genderError,
      tos: tosError,
    });

    if (isFormValid) return true;
    return false;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFormFields()) {
      try {
        setSignupError("");
        setIsLoading(true);
        await signup(
          fields["email"],
          fields["password"],
          fields["profile_name"]
        );
        navigation("/login");
      } catch (err: unknown) {
        if (err instanceof FirebaseError) {
          setSignupError(err.message);
        }
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSignupError("");
    setErrors({
      email: "",
      confirm_email: "",
      password: "",
      profile_name: "",
      day_of_birth: "",
      month_of_birth: "",
      year_of_birth: "",
      gender: "",
      tos: false,
    });
  }, [fields]);

  useEffect(() => {
    for (const [key, value] of Object.entries(errors)) {
      if (value) {
        const err = document.querySelector(`#${key}`);
        err?.scrollIntoView({ behavior: "smooth", block: "center" });
        break;
      }
    }
  }, [errors]);

  return (
    <form className="signup-form" onSubmit={(e) => handleFormSubmit(e)}>
      <div className="signup-form__text-inputs">
        <Input
          type="text"
          id="email"
          label="What's your email?"
          placeholder="Enter your email"
          value={fields["email"]}
          onChange={handleTextInputChange}
          style={
            errors["email"] ? { borderColor: "var(--color-error)" } : undefined
          }
        />
        {errors["email"] && (
          <span className="error-field">
            <img src={ErrorIcon} />
            {errors["email"]}
          </span>
        )}
        <Input
          type="text"
          id="confirm_email"
          label="Confirm your email"
          placeholder="Enter your email again"
          value={fields["confirm_email"]}
          onChange={handleTextInputChange}
          style={
            errors["confirm_email"]
              ? { borderColor: "var(--color-error)" }
              : undefined
          }
        />
        {errors["confirm_email"] && (
          <span className="error-field">
            <img src={ErrorIcon} />
            {errors["confirm_email"]}
          </span>
        )}
        <Input
          type="password"
          id="password"
          label="Create a password"
          placeholder="Create a password"
          value={fields["password"]}
          onChange={handleTextInputChange}
          style={
            errors["password"]
              ? { borderColor: "var(--color-error)" }
              : undefined
          }
        />
        {errors["password"] && (
          <span className="error-field">
            <img src={ErrorIcon} />
            {errors["password"]}
          </span>
        )}
        <Input
          type="text"
          id="profile_name"
          label="What should we call you?"
          placeholder="Enter a profile name"
          value={fields["profile_name"]}
          onChange={handleTextInputChange}
          style={
            errors["profile_name"]
              ? { borderColor: "var(--color-error)" }
              : undefined
          }
        />
        {errors["profile_name"] && (
          <span className="error-field">
            <img src={ErrorIcon} />
            {errors["profile_name"]}
          </span>
        )}
      </div>
      <p>This appears on your profile</p>
      <BirthInput
        day={fields["day_of_birth"]}
        month={fields["month_of_birth"]}
        year={fields["year_of_birth"]}
        onChange={handleDateInputChange}
        errors={errors}
      />
      <GenderInput
        value={fields["gender"]}
        onChange={handleGenderInputChange}
        errors={errors}
      />
      {signupError && (
        <div className="signup-form__signup-error">{signupError}</div>
      )}
      <Tos value={fields["tos"]} onChange={handleTosChange} errors={errors} />
      <Button
        disabled={isLoading}
        className="button button--signup"
        text="Sign up"
      />
    </form>
  );
};
