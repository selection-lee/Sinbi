import React from "react";
import { YellowButtonProps } from "./CommonComponent.types";

const YellowButton: React.FC<YellowButtonProps> = ({ children, height, width, onClick }) => {
  return <button onClick={onClick} style={{ height: `${height}px`, width: `${width}px` }} className={`bg-[#FFC700] p-4 rounded-md`}>{children}</button>;
};

export default YellowButton;
