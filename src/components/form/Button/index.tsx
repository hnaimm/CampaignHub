import { MouseEventHandler } from "react";
import "./Button.scss";

const Button = ({
  title,
  onClick,
}: {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  return <button onClick={onClick || undefined}>{title}</button>;
};

export default Button;
