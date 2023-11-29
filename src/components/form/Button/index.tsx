import { MouseEventHandler } from "react";
import "./style.scss";

const Button = ({
  title,
  onClick,
  type = "button",
  primary = true,
}: {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  primary?: boolean;
}) => {
  return (
    <button
      type={type}
      onClick={onClick || undefined}
      className={primary ? "button primary" : "button secondary"}
    >
      {title}
    </button>
  );
};

export default Button;
