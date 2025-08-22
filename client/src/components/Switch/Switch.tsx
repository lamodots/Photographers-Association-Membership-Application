import { useState } from "react";

type SwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "green" | "blue" | "purple" | "red";
  label?: string;
  className?: string;
};

const Switch = ({
  value,
  onChange,
  disabled = false,
  size = "md",
  color = "green",
  label,
  className = "",
}: SwitchProps) => {
  const handleChange = () => {
    if (disabled) return;
    onChange(!value);
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      track: "w-8 h-4",
      thumb: "w-3 h-3",
      translate: "translate-x-4",
    },
    md: {
      track: "w-11 h-6",
      thumb: "w-4 h-4",
      translate: "translate-x-5",
    },
    lg: {
      track: "w-14 h-8",
      thumb: "w-6 h-6",
      translate: "translate-x-6",
    },
  };

  // Color configurations
  const colorConfig = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
  };

  const config = sizeConfig[size];
  const activeColor = colorConfig[color];

  return (
    <label
      className={`relative inline-flex items-center cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <input
        type="checkbox"
        checked={value}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
      />

      {/* Track */}
      <div
        className={`
          ${config.track}
          ${value ? activeColor : "bg-gray-300"}
          rounded-full
          relative
          transition-colors
          duration-200
          ease-in-out
          ${disabled ? "" : "hover:shadow-lg"}
        `}
      >
        {/* Thumb */}
        <div
          className={`
            ${config.thumb}
            bg-white
            rounded-full
            shadow-md
            transform
            transition-transform
            duration-200
            ease-in-out
            absolute
            top-1/2
            -translate-y-1/2
            left-1
            ${value ? config.translate : "translate-x-0"}
          `}
        />
      </div>

      {/* Label */}
      {label && (
        <span
          className={`ml-3 text-sm font-medium ${
            disabled ? "text-gray-400" : "text-gray-900"
          }`}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default Switch;
