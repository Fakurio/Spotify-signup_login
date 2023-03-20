import React from "react";
import "./Input.scss";

interface Props {
  id: string;
  label: string;
  placeholder?: string;
  type: string;
  value: string;
  onChange: (fieldName: string, value: string) => void;
  onClick?: () => void;
  style?: { borderColor: string };
}

export const Input: React.FC<Props> = ({
  id,
  label,
  placeholder,
  type,
  value,
  onChange,
  style,
  onClick,
}) => {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="field__input"
        type={type || "text"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(id, e.target.value)}
        onClick={onClick}
        style={style}
        onKeyPress={
          type === "number"
            ? (e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }
            : undefined
        }
      />
    </div>
  );
};
