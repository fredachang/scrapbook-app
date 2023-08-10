import { useState } from "react";
import { NavLink } from "react-router-dom";
import { twStyle } from "../tailwind";

interface Props {
  path: string;
  linkTitle: string;
  handleOnClick?: () => void;
}

export const NavTab = (props: Props) => {
  const { path, linkTitle, handleOnClick } = props;
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const highlightStripStyle = `bg-${twStyle.primaryColour} ${
    hover && `bg-${twStyle.highlightColour}`
  } w-1.5 h-full`;

  return (
    <>
      <NavLink
        onClick={handleOnClick}
        to={path}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "verticalTextActive"
            : "verticalText"
        }
      >
        <div className={highlightStripStyle}></div>
        <h2 className="h-full text-center"> {linkTitle}</h2>
      </NavLink>
    </>
  );
};
