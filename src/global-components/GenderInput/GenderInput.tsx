import React from "react";
import "./GenderInput.scss";
import { FormFields } from "@/modules/AppModule/types/FormFields";
import ErrorIcon from "@/assets/images/error.svg";

const genders = ["Male", "Female", "Non-binary", "Other", "Prefer not to say"];

interface Props {
  value: string;
  onChange: (value: string) => void;
  errors: FormFields;
}

export const GenderInput: React.FC<Props> = ({ value, onChange, errors }) => {
  return (
    <div className="gender-input" id="gender">
      <p>What&apos;s your gender?</p>
      <div className="gender-input__options">
        {genders.map((gender, idx) => (
          <div key={idx} className="option">
            <input
              id={gender}
              type="radio"
              name="gender"
              value={gender}
              checked={gender === value}
              onChange={(e) => onChange(e.target.value)}
              style={
                errors["gender"]
                  ? { borderColor: "var(--color-error)" }
                  : undefined
              }
            />
            <label htmlFor={gender}>{gender}</label>
          </div>
        ))}
      </div>
      {errors["gender"] && (
        <span className="error-field">
          <img src={ErrorIcon} />
          {errors["gender"]}
        </span>
      )}
    </div>
  );
};
