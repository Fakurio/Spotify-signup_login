import React from "react";
import "./MonthPicker.scss";
import { useState, useEffect, useRef } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface Props {
  style?: string;
  value: string;
  onChange: (fieldName: string, value: string) => void;
}

export const MonthPicker: React.FC<Props> = ({ style, value, onChange }) => {
  const [isHidden, setIsHidden] = useState(true);
  const pickerRef = useRef<HTMLDivElement>(null);

  const stylesPicker = {
    color: value !== "Month" ? "#000" : undefined,
    borderColor: style ? style : !isHidden ? "#000" : undefined,
  };

  const handlePickertoggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHidden(!isHidden);
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.target !== pickerRef.current) {
        setIsHidden(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="month-picker" ref={pickerRef}>
      <label onClick={(e) => handlePickertoggle(e)}>Month</label>
      <div
        id="month_of_birth"
        className="select"
        onClick={(e) => handlePickertoggle(e)}
        style={stylesPicker}
      >
        {value}
      </div>
      {!isHidden && (
        <div className="options">
          {months.map((month, idx) => (
            <option
              className="option"
              key={idx}
              value={month}
              onClick={() => onChange("month_of_birth", month)}
            >
              {month}
            </option>
          ))}
        </div>
      )}
    </div>
  );
};
