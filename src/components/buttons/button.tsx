import { IButtonProps } from "@/interfaces";
import React from "react";

export const Button = ({
  type,
  text,
  className,
  callback,
  disable,
  children,
}: IButtonProps) => {
  return (
    <button
      disabled={disable}
      className={className}
      type={type}
      onClick={callback}
    >
      {text || children}
    </button>
  );
};
