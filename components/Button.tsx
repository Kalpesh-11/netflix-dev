import { ButtonProps } from "@/types";
import React from "react";

function Button({ title, icon, btnFormat }: ButtonProps) {
  return (
    <button className={`netflix-btn-normal mt-4 ${btnFormat}`}>
      <span className="text-xl pr-1">{icon}</span> {title}
    </button>
  );
}

export default Button;
