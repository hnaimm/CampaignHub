import { ReactElement, Children } from "react";
import "./Card.scss";

const Card = ({
  children,
  fullHeight,
}: {
  children: ReactElement;
  fullHeight?: boolean;
}) => {
  return (
    <div id="card" className={fullHeight ? "fullHeight" : ""}>
      {Children.only(children)}
    </div>
  );
};

export default Card;
