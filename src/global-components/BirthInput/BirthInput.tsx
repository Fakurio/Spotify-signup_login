import React from "react";
import { Input } from "../Input/Input";
import { MonthPicker } from "../MonthPicker/MonthPicker";
import ErrorIcon from "@/assets/images/error.svg";
import "./BirthInput.scss";
import { FormFields } from "@/modules/AppModule/types/FormFields";

interface Props {
  onChange: (fieldName: string, value: string) => void;
  day: string;
  month: string;
  year: string;
  errors: FormFields;
}

export const BirthInput: React.FC<Props> = ({
  onChange,
  day,
  month,
  year,
  errors,
}) => {
  return (
    <div className="birth-input">
      <p>What&apos;s your date of birth</p>
      <div className="birth-input__fields">
        <div className="birth-input__fields__month-picker">
          <MonthPicker
            value={month}
            onChange={onChange}
            style={errors["month_of_birth"] ? "var(--color-error)" : undefined}
          />
          {errors["month_of_birth"] && (
            <span className="error-field">
              <img src={ErrorIcon} />
              {errors["month_of_birth"]}
            </span>
          )}
        </div>
        <div>
          <Input
            id="day_of_birth"
            label="Day"
            placeholder="DD"
            type="number"
            onChange={onChange}
            value={day}
            style={
              errors["day_of_birth"]
                ? { borderColor: "var(--color-error)" }
                : undefined
            }
          />
          {errors["day_of_birth"] && (
            <span className="error-field">
              <img src={ErrorIcon} />
              {errors["day_of_birth"]}
            </span>
          )}
        </div>
        <div>
          <Input
            id="year_of_birth"
            label="Year"
            placeholder="YYYY"
            type="number"
            onChange={onChange}
            value={year}
            style={
              errors["year_of_birth"]
                ? { borderColor: "var(--color-error)" }
                : undefined
            }
          />
          {errors["year_of_birth"] && (
            <span className="error-field">
              <img src={ErrorIcon} />
              {errors["year_of_birth"]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
