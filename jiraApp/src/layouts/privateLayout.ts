import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type PrivateLayoutProps = {
  children: React.ReactElement;
};
const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")!);
  const device = JSON.parse(localStorage.getItem("device")!);
  const dispath = useDispatch();

  if (!user) {
    navigate("/signin");
  }
  return children;
};

export default PrivateLayout;
