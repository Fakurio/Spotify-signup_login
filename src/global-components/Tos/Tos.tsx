import React from "react";
import "./Tos.scss";
import { FormFields } from "@/modules/AppModule/types/FormFields";
import ErrorIcon from "@/assets/images/error.svg";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  errors: FormFields;
}

export const Tos: React.FC<Props> = ({ value, onChange, errors }) => {
  return (
    <div className="tos">
      <div className="tos__checkbox">
        <input
          id="consent"
          type="checkbox"
          checked={value}
          onChange={() => onChange(!value)}
          style={
            errors["tos"] ? { borderColor: "var(--color-error)" } : undefined
          }
        />
        <label htmlFor="consent">
          Share my registration date with Spotify&apos;s content providers for
          marketing purposes.
        </label>
      </div>
      {errors["tos"] && (
        <span className="error-field">
          <img src={ErrorIcon} />
          Checkbox required
        </span>
      )}
      <p className="term-of-use">
        By clicking on sing-up. You agree to Spotify&apos;s{" "}
        <span>Terms and Conditions of Use</span>.
      </p>
      <p>
        To learn more about how Spotify collects, uses, shares and protects your
        personal data, please see <span>Spotify&apos;s Privacy Policy</span>.
      </p>
    </div>
  );
};
