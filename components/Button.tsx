import { ButtonProps } from "@/types";
import React from "react";

function Button({ title, icon, btnFormat, btnClass }: ButtonProps) {
  return (
    <button className={`${btnClass} ${btnFormat}`}>
      <span className="text-l pr-1 md:text-xl">{icon}</span>
      {title && <span>{title}</span>}
    </button>
  );
}

export default Button;
