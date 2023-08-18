import { NavLink } from "react-router-dom";

interface Props {
  path: string;
  linkTitle: string;
  handleOnClick?: () => void;
}

export const NavTab = (props: Props) => {
  const { path, linkTitle, handleOnClick } = props;
  // const [hover, setHover] = useState(false);

  // const handleMouseEnter = () => {
  //   setHover(true);
  // };

  // const handleMouseLeave = () => {
  //   setHover(false);
  // };

  return (
    <>
      <NavLink
        onClick={handleOnClick}
        to={path}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "verticalTextActive"
            : "verticalText"
        }
      >
        <h2 className="font-regular h-full text-center text-xl">
          {" "}
          {linkTitle}
        </h2>
      </NavLink>
    </>
  );
};
