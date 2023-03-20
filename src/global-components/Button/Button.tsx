import React from "react";
import "./Button.scss";

interface Props {
  icon?: string;
  text: string;
  className: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({
  icon,
  text,
  className,
  disabled,
  onClick,
}) => {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {icon && <img src={icon} />}
      <span>{text}</span>
    </button>
  );
};
